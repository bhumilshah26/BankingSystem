// import { execute } from '../config/db';
const db = require('../config/db')

const addtransaction = async (req, res) => { 
    const { account_number, amount, transaction_type, description } = req.body;

    if(!account_number || !amount || !transaction_type)
        res.status(400).send('Insufficient Info!');

    try{
        await db.execute('insert into transactions (account_number, amount, transaction_type, description) values (?, ?, ?, ?)',
            [account_number, amount, transaction_type, description]
        );
        res.status(200).send('transaction added successfully');

    } catch(err) { console.error('Error: ', err); res.status(500).send('Database Error!'); }

}

module.exports = { addtransaction };