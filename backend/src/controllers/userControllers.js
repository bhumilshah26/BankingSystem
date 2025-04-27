const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Please provide all the details');
    }

    // 10 is salt rounds (same password users get added with 10 random different strings before hasing to avoid attacks)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await db.execute('insert into users (name, email, password) values (?, ?, ?)',
            [name, email, hashedPassword]
        );
        const [result] = await db.execute('select id from users where email = ?', [email]);
        res.status(201).send({user_id: user_id, message:"User Created Successfully"})
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Database Error!');
    }
};

const verifyUser = async (req, res) => {
    const { user_id, password } = req.body;
    if(!user_id || !password)
        return res.status(400).send("Enter all details");

    try {
        const [result] = await db.execute('select password from users where id = ?', [user_id]);
        if(result.length === 0)
            return res.status(404).send("User Not Found!");

        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
        if(isPasswordCorrect)
            return res.status(400).send("Incorrect Password");

        // generate JWT token
        const payload = {
            userId: user[0].id,  // You can include any other information here, like user role or email
            email: user[0].email,
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });       

        res.status(200).send({ token:token, message:"Logged in Successfully !"})

    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error!");
    }
}

const readUser = async (req, res) => {
    const { email } = req.params;
    if(!email) 
        return res.status(400).send("No email");

    try {
        const [results] = await db.execute('select id from users where email = ?', [email]);
        if(email && results.length > 0)
            return res.status(200).send(results[0].id)

        return res.status(404).send('No such user exists');

    } catch(err) { console.error(err); return res.status(500).send('Database Error'); }

};

// after readUser to fetch the user_id u can Update and Delete the user details as
const updateUser = async (req, res) => {
    const { user_id, name, email, password } = req.body;
    
    if(!user_id)
        return res.status(400).send('No user_id given!');

    try {
        const [results] = await db.execute('select * from users where id = ?', [user_id]);
        if(name) results[0].name = name;
        if(email) results[0].email = email;
        if(password) results[0].password = await bcrypt.hash(password, 10);

        await db.execute('update users set name = ?, email = ?, password = ? where id = ?',
            [results[0].name, results[0].email, results[0].password, user_id]);

        res.status(200).send('Updation Successful!');

    } catch(err) { console.error(err); return res.status(500).send('Database Error'); }
};

const deleteUser = async (req, res) => {
    const { user_id } = req.params;

    if(!user_id)
        return res.status(404).send('user not given!');

    try {
        // this will delete any accounts related to a particular user too
        await db.execute('delete from users where id = ?', [user_id]);
        res.status(200).send('User deleted successfully');

    } catch(err) { console.error(err); return res.status(500).send('Database Error'); }
};

const allUsers = async (req, res) => {
    try{
        const [users] = await db.execute('select count(*) as count from users');
        res.status(200).send({ count: users[0].count }); 
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Database Error!');
    }
};

module.exports = { createUser, readUser, verifyUser, updateUser, deleteUser, allUsers };