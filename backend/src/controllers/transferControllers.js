const db = require('../config/db.js')

const appendTransfers = async (req, res) => {
    // future: the reciver_account_id can be added via its email or phone no (adding beneficiary)
    const { sender_account_number, receiver_account_number, amount, description } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [sender] = await connection.execute("select balance from accounts where account_number = ?", [sender_account_number]);
        const [receiver] = await connection.execute("select id from accounts where account_number = ?",[receiver_account_number]);
        if(sender.length === 0)
            throw new Error("Sender Not Found");
        
    
        if(sender[0].amount < amount) 
            throw new Error("Insufficient Balance");
        
            
        await connection.execute("update accounts set balance = balance - ? where account_number = ?", [amount, sender_account_number]);
        await connection.execute("update accounts set balance = balance + ? where account_number = ?", [amount, receiver_account_number]);

        await connection.execute("insert into transfers(sender_account_number, receiver_account_number, amount, description, status) values (?, ?, ?, ?, ?)", 
            [sender_account_number, receiver_account_number, amount, description, "success"]
        );   
        
        await connection.commit();

        res.status(200).send("Transfer Complete !");

    } catch(e) {
        await connection.rollback();
        await connection.execute("insert into transfers(sender_account_number, receiver_account_number, amount, description, status) values (?, ?, ?, ?, ?)", 
            [sender_account_number, receiver_account_number, amount, description, "fail"]
        );

        res.status(500).send({error:e, message:"Transfer Incomplete"});

    } finally {
        connection.release();
    }
}

module.exports = { appendTransfers };