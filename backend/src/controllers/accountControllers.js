const db = require('../config/db')
const bcrypt = require('bcrypt')

const createAccount = async (req, res) => {
    const { user_id, account_number, account_type } = req.body;
    if(!user_id || !account_number || !account_type) {
        return res.status(400).send({message:"Insufficient details!"});
    }
    try {
        await db.execute('insert into accounts(user_id, account_number, account_type) values (?, ?, ?)',
            [user_id, account_number, account_type]
        );
        return res.status(201).send({message:'Account Creation Successful!'});

    } catch(err) {
        if(err.code === 'ER_DUP_ENTRY')
            return res.status(409).send({message:"Account Already Exists!"}); 
        
        return res.status(500).send({message:"Database Error!"})
    }
};

const readAccount = async (req, res) => {
    const { user_id } = req.query;

    if(!user_id)
        return res.status(400).send({message: 'No user found!'});

    try {
        const [result] = await db.execute('select id, balance from accounts where user_id = ?', [user_id]);
        return res.status(200).send(result);
         
    } catch(err) { return res.status(500).send({message: 'DataBase Error!'}); }
};

const deleteAccount = async (req, res) => {
    const { accountNumber, password, user_id } = req.body;
        
    if(!user_id)
        return res.status(404).send({message:'user not given!'});

    try {
        const [result1] = await db.execute('select id from accounts where account_number = ?', [accountNumber]);

        if(result1.length === 0)
            return res.status(404).send({message:"Account doesn't exists!"});

        const [result2] = await db.execute('select password from users where user_id = ?', [user_id]);
        if(result2.length === 0)
            return res.status(404).send({message:"User Not Found!"});
            
        const isPasswordCorrect = await bcrypt.compare(password, result2[0].password);
        if(!isPasswordCorrect)
            return res.status(409).send({message:"Incorrect Password"});

        await db.execute('delete from accounts where account_number = ?', [accountNumber]);

        return res.status(200).send({message: "Account Deletion Successfull"});

    } catch(err) { console.error(err); return res.status(500).send({message:'Database Error!'}); }
};

const allaccounts = async (req, res) => {
    const user_id  = req.params.user_id;
    try {
        const [accounts] = await db.execute('select account_number, balance from accounts where user_id = ?', [user_id]);
        return res.status(200).send({accounts:accounts, message:"Retrieval Success"})
    } catch (e) {
        return res.status(500).send({message: "Database Error!"});
    }
}

const accountstatements = async (req, res) => {
    const account_number = req.params.account_number;
    try {
        const [transactions] = await db.execute("select amount, transaction_type, description, transaction_time, status from transactions where account_number = ?", [account_number]);

        const [transfers] = await db.execute("select sender_account_number, receiver_account_number, amount, description, status, transfer_time from transfers where sender_account_number = ? or receiver_account_number = ?", [account_number, account_number]);

        return res.status(200).send({transactions:transactions, transfers:transfers, message:"Fetched Success"});

    } catch (e) {
        return res.status(500).send({message:"Database Error!"});
    }
}

module.exports = { createAccount, readAccount, deleteAccount, allaccounts, accountstatements };