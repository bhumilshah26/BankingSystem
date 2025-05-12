const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user_id = req.body.userid;

    if (!name || !email || !password || !user_id) {
        return res.status(400).send({message:"Please provide all the details"});
    }

    // 10 is salt rounds (same password users get added with 10 random different strings before hasing to avoid attacks)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await db.execute('insert into users (name, email, user_id, password) values (?, ?, ?, ?)',
            [name, email, user_id, hashedPassword]
        );
        const [result] = await db.execute('select id from users where email = ?', [email]);
        res.status(201).send({user_id: user_id, message:"User Created Successfully"})
    }
    catch (err) { 
        if(err.code === 'ER_DUP_ENTRY') {
            return res.status(409).send({message:"Account Already Exists"});
        }
        return res.status(500).send({message:"Database Error!"});
    }
};

const loginUser = async (req, res) => {
    const user_id = req.body.userid;
    const password = req.body.password;
    if(!user_id || !password)
        return res.status(400).send({message:"Insufficient Details"});

    try {
        const [result] = await db.execute('select name, email, user_id, password from users where user_id = ?', [user_id]);

        if(result.length === 0)
            return res.status(404).send({message:"User Not Found!"});

        const isPasswordCorrect = await bcrypt.compare(password, result[0].password);
        if(!isPasswordCorrect)
            return res.status(401).send({message: "Incorrect Password"});

        
        const token = jwt.sign({ user_id:user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });       

        return res.status(200).send({user_details: {name:result[0].name, email:result[0].email, userid:result[0].user_id}, token:token, message:"Login Success!"})

    } catch (err) { return res.status(500).send({message: "Database Error!"}); }
}

const readUser = async (req, res) => {
    const { email } = req.params;
    if(!email) 
        return res.status(400).send({message: "No email"});

    try {
        const [results] = await db.execute('select user_id from users where email = ?', [email]);
        if(email && results.length > 0) {
            const user_details = {
                name:results[0].name,
                email:results[0].email,
                created_at:results[0].created_at,
                user_id:results[0].user_id
            }
            return res.status(200).send({user_details:user_details})
        }

        return res.status(404).send({message:"User Not Found!"});

    } catch(err) { return res.status(500).send({message:"Database Error!"}); }

};

// after readUser to fetch the user_id u can Update and Delete the user details as
const updateUser = async (req, res) => {
    const { user_id, name, email, password } = req.body;
    
    if(!user_id)
        return res.status(400).send({message:"User Details Not provided!"});

    try {
        const [results] = await db.execute('select * from users where user_id = ?', [user_id]);
        if(name) results[0].name = name;
        if(email) results[0].email = email;
        if(password) results[0].password = await bcrypt.hash(password, 10);

        await db.execute('update users set name = ?, email = ?, password = ? where user_id = ?',
            [results[0].name, results[0].email, results[0].password, user_id]);

        res.status(200).send('Updation Successful!');

    } catch(err) { return res.status(500).send({message:"Database Error!"}); }
};

const deleteUser = async (req, res) => {
    const { user_id } = req.params;

    if(!user_id)
        return res.status(404).send({message:"Insufficient Details!"});

    try {
        // this will delete any accounts related to a particular user too
        await db.execute('delete from users where user_id = ?', [user_id]);
        res.status(200).send({message:"User deleted successfully"});

    } catch(err) { return res.status(500).send({message:"Database Error!"}); }
};

const allUsers = async (req, res) => {
    try{
        const [users] = await db.execute('select count(*) as count from users');
        res.status(200).send({ count: users[0].count }); 
    }
    catch(err) {
       return res.status(500).send({message:"Database Error!"});
    }
};

module.exports = { registerUser, readUser, loginUser, updateUser, deleteUser, allUsers };