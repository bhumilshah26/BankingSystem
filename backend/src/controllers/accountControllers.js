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
    const { user_id } = req.body;

    if(!user_id)
        return res.status(400).send('No user logged in!');

    try {
        const [result] = await db.execute('select id, balance from accounts where user_id = ?', [user_id]);
        res.status(200).send(result);
         
    } catch(err) { console.error( "Error: ", err); res.status(500).send('DataBase Error!'); }
};

const deleteAccount = async (req, res) => {
    const { account_id } = req.params;
    
    if(!account_id)
        return res.status(404).send('user not given!');

    try {
        await db.execute('delete from accounts where id = ?', [account_id]);
    } catch(err) { console.error("Error: ", err); return res.status(500).send('Database Error!'); }
};

module.exports = { createAccount, readAccount, deleteAccount };