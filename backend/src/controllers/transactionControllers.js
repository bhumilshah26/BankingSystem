// import { execute } from '../config/db';
const db = require('../config/db');
const transporter = require('../config/mailer')

const addtransaction = async (req, res) => { 
    const { taccount, tamount, ttype, tdesc } = req.body;

    if(!taccount || !tamount || !ttype || isNaN(tamount))  
       return res.status(400).send('Insufficient Info!');

    try { 
        const [account] = await db.execute('select balance from accounts where account_number = ?', [taccount]);

        if(account.length === 0)
            return res.status(404).send({message: "Account Not Found"});

        if(ttype === "withdrawal" && account[0].balance < parseFloat(tamount)) 
            return res.status(400).send({message:"Low Balance"});
        
        await db.execute('insert into transactions (account_number, amount, transaction_type, description) values (?, ?, ?, ?)',
            [taccount, tamount, ttype, tdesc]
        );
        const [userdetails] = await db.execute('select name, email from users where user_id = (select user_id from accounts where account_number = ?)', 
            [taccount]);

        const transaction = ttype === 'deposit' ? 'credited' : 'debited'; 
        const last4 = taccount.toString().slice(-4);
        let newBalance = account[0].balance;

        if(ttype === 'deposit') { newBalance += tamount; }
        else { newBalance -= tamount; }

        const mailOptions = {
            from: 'bhumil.shah2608@gmail.com',
            to:userdetails[0].email,
            subject:`Transaction Alert`,
            text:`Dear Customer\n\nThank you for banking with us.\n\nYour BSNB Bank Account No. 15XXXXXX${last4} has been ${transaction} for INR ${tamount} towards Net Banking.\n\nThe balance avaliable in your account is ${parseFloat(newBalance)}`
        };
        transporter.sendMail(mailOptions, (err, info) => { if(err) { console.log("Error: ", err); }});

        return res.status(200).send('Transaction Successful!');

    } catch(err) { console.error('Error: ', err); res.status(500).send('Database Error!'); }

}

module.exports = { addtransaction };