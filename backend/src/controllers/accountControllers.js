const db = require('../config/db')

const createAccount = async (req, res) => {
    const { user_id, account_number, account_type } = req.body;
    if(!user_id || !account_number || !account_type) {
        return res.status(400).send({message:"Insufficient details!"});
    }
    try {
        await db.execute('insert into accounts(user_id, account_number, account_type) values (?, ?, ?)',
            [user_id, account_number, account_type]
        );
        return res.status(201).send('Account Creation Successful!');

    } catch(err) {
        if(err.sqlMessage[0] == 'D')
            return res.status(400).send({message:"Unsuccessful Account Creation"}); 
        
        return res.status(500).send({message:"Database error"})
    }
};

const readAccount = async (req, res) => {
    const { user_id } = req.query;

    if(!user_id)
        return res.status(400).send('No user logged in!');

    try {
        const [result] = await db.execute('select id, balance from accounts where user_id = ?', [user_id]);
        return res.status(200).send(result);
         
    } catch(err) { console.error("Error: ", err); return res.status(500).send('DataBase Error!'); }
};

const deleteAccount = async (req, res) => {
    const { account_id } = req.query;
    
    if(!account_id)
        return res.status(404).send('user not given!');

    try {
        await db.execute('delete from accounts where id = ?', [account_id]);
    } catch(err) { console.error("Error: ", err); return res.status(500).send('Database Error!'); }
};

const allaccounts = async (req, res) => {
    const user_id  = req.params.user_id;
    try {
        const [accounts] = await db.execute('select account_number from accounts where user_id = ?', [user_id]);
        return res.status(200).send({accounts:accounts, message:"retrieval sucessful"})
    } catch (e) {
        return res.status(400).send({message: "database Error!"});
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