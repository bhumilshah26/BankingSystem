const db = require('../config/db')

const createAccount = async (req, res) => {
    const { user_id, account_number, account_type } = req.body;
    if(!user_id || !account_number || !account_type) {
        return res.status(400).send("Insufficient details!");
    }
    try {
        await db.execute('insert into accounts(user_id, account_number, account_type) values (?, ?, ?)',
            [user_id, account_number, account_type]
        );
        res.status(200).send('Account Creation Successful!');

    } catch(err) { console.error("Error: ", err); res.status(500).send('DataBase Error!'); }
};

const readAccount = async (req, res) => {
    const { user_id } = req.query;

    if(!user_id)
        return res.status(400).send('No user logged in!');

    try {
        const [result] = await db.execute('select id, balance from accounts where user_id = ?', [user_id]);
        res.status(200).send(result);
         
    } catch(err) { console.error("Error: ", err); res.status(500).send('DataBase Error!'); }
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
        console.log(Array.from(accounts));
        res.status(200).send({accounts:accounts, message:"retrieval sucessful"})
    } catch (e) {
        res.send(400).send("database error!");
    }
}

module.exports = { createAccount, readAccount, deleteAccount, allaccounts };