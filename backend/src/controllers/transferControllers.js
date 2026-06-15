const db = require('../config/db.js')
const transporter = require('../config/mailer.js')
const config = require('../config/config.js')

const appendTransfers = async (req, res) => {
    // future: the reciver_account_id can be added via its email or phone no (adding beneficiary)
    const { san, ban, ftamount, ftdesc } = req.body;

    // Check out a single client from the pool so BEGIN/COMMIT/ROLLBACK all run
    // on the same connection (ACID-compliant transfer).
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        const sender = await client.query("select balance from accounts where account_number = $1", [san]);
        const receiver = await client.query("select id from accounts where account_number = $1", [ban]);

        if(sender.rows.length === 0)
            throw new Error("Sender Not Found");

        if(receiver.rows.length === 0)
            throw new Error("Receiver Not Found");

        const amount = parseFloat(ftamount);

        if(sender.rows[0].balance < amount) {
            await client.query('ROLLBACK');
            return res.status(403).send({message:"Insufficient Balance!"});
        }

        await client.query("update accounts set balance = balance - $1 where account_number = $2", [amount, san]);
        await client.query("update accounts set balance = balance + $1 where account_number = $2", [amount, ban]);

        await client.query("insert into transfers(sender_account_number, receiver_account_number, amount, description, status) values ($1, $2, $3, $4, $5)",
            [san, ban, ftamount, ftdesc, "success"]
        );

        await client.query('COMMIT');

        // mailing the users
        const senderuserdetails = await db.query('select name, email from users where user_id = (select user_id from accounts where account_number = $1)',
            [san]);
        const receiveruserdetails = await db.query('select name, email from users where user_id = (select user_id from accounts where account_number = $1)',
            [ban]);

        const last4sender = san.toString().slice(-4);
        const last4reciever = ban.toString().slice(-4);

        const sendermailOptions = {
            from: config.mail.from,
            to:senderuserdetails.rows[0].email,
            subject:`Transaction Alert`,
            text:`Dear Customer\n\nThank you for banking with us.\n\nYour BSNB Bank Account No. 15XXXXXX${last4sender} has been debited for INR ${ftamount} towards Net Banking.\n\nThe balance avaliable in your account is ${parseFloat(sender.rows[0].balance - ftamount)}`
        };
        transporter.sendMail(sendermailOptions, (err, info) => { if(err) console.error(`Mail Error: ${err}`); });

        const receivermailOptions = {
            from: config.mail.from,
            to:receiveruserdetails.rows[0].email,
            subject:`Transaction Alert`,
            text:`Dear Customer\n\nThank you for banking with us.\n\nYour BSNB Bank Account No. 15XXXXXX${last4reciever} has been credited for INR ${ftamount} towards Net Banking.\n\nThe balance avaliable in your account is ${parseFloat(Number(receiver.rows[0].balance) + Number(ftamount))}`
        };
        transporter.sendMail(receivermailOptions, (err, info) => { if(err) console.error(`Mail Error: ${err}`); });

        return res.status(200).send({message: "Transfer Complete!"});

    } catch(e) {
        await client.query('ROLLBACK');
        // log the failed transfer on a fresh pool connection (the client is being released)
        await db.query("insert into transfers(sender_account_number, receiver_account_number, amount, description, status) values ($1, $2, $3, $4, $5)",
            [san, ban, ftamount, ftdesc, "fail"]
        );

        return res.status(500).send({message:"Database Error!"});

    } finally {
        client.release();
    }
}

module.exports = { appendTransfers };
