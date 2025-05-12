const db = require('../config/db.js')
const transporter = require('../config/mailer.js')

const appendTransfers = async (req, res) => {
    // future: the reciver_account_id can be added via its email or phone no (adding beneficiary)
    const { san, ban, ftamount, ftdesc } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [sender] = await connection.execute("select balance from accounts where account_number = ?", [san]);
        const [receiver] = await connection.execute("select id from accounts where account_number = ?", [ban]);

        if(sender.length === 0)
            throw new Error("Sender Not Found");
        
        if(receiver.length === 0)
            throw new Error("Receiver Not Found");

        const amount = parseFloat(ftamount);
    
        if(sender[0].balance < amount) { return res.status(403).send({message:"Insufficient Balance!"}); }
            
        await connection.execute("update accounts set balance = balance - ? where account_number = ?", [amount, san]);
        await connection.execute("update accounts set balance = balance + ? where account_number = ?", [amount, ban]);

        await connection.execute("insert into transfers(sender_account_number, receiver_account_number, amount, description, status) values (?, ?, ?, ?, ?)", 
            [san, ban, ftamount, ftdesc, "success"]
        );   
        
        await connection.commit();

        // mailing the users
        const [senderuserdetails] = await db.execute('select name, email from users where user_id = (select user_id from accounts where account_number = ?)', 
            [san]);
        const [receiveruserdetails] = await db.execute('select name, email from users where user_id = (select user_id from accounts where account_number = ?)',
            [ban]);
        
        const last4sender = san.toString().slice(-4);
        const last4reciever = ban.toString().slice(-4);

        const sendermailOptions = {
            from: 'bhumil.shah2608@gmail.com',
            to:senderuserdetails[0].email,
            subject:`Transaction Alert`,
            text:`Dear Customer\n\nThank you for banking with us.\n\nYour BSNB Bank Account No. 15XXXXXX${last4sender} has been debited for INR ${ftamount} towards Net Banking.\n\nThe balance avaliable in your account is ${parseFloat(sender[0].balance - ftamount)}`
        };
        transporter.sendMail(sendermailOptions, (err, info) => { if(err) console.log(err); });

        const receivermailOptions = {
            from: 'bhumil.shah2608@gmail.com',
            to:receiveruserdetails[0].email,
            subject:`Transaction Alert`,
            text:`Dear Customer\n\nThank you for banking with us.\n\nYour BSNB Bank Account No. 15XXXXXX${last4reciever} has been credited for INR ${ftamount} towards Net Banking.\n\nThe balance avaliable in your account is ${parseFloat(receiver[0].balance + ftamount)}`
        };
        transporter.sendMail(receivermailOptions, (err, info) => { if(err) console.log(err); });

        return res.status(200).send({message: "Transfer Complete!"});

    } catch(e) {
        await connection.rollback();
        await connection.execute("insert into transfers(sender_account_number, receiver_account_number, amount, description, status) values (?, ?, ?, ?, ?)", 
            [san, ban, ftamount, ftdesc, "fail"]
        );

        return res.status(500).send({message:"Database Error!"});

    } finally {
        connection.release();
    }
}

module.exports = { appendTransfers };