const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const transporter = require('../config/mailer')

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

// Password Reset Request
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    try {
        // Check if user exists
        const [users] = await db.execute('SELECT user_id, name FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(404).send({ message: "User not found with this email" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Store reset token in database
        await db.execute(
            'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
            [resetToken, resetTokenExpiry, email]
        );

        // Send email
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        
        const mailOptions = {
            from: 'bhumil.shah2608@gmail.com',
            to: email,
            subject: 'Password Reset Request - BSNB Banking',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #832625;">BSNB Banking - Password Reset</h2>
                    <p>Hello ${users[0].name},</p>
                    <p>You have requested to reset your password. Click the button below to reset your password:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" 
                           style="background-color: #832625; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you didn't request this password reset, please ignore this email.</p>
                    <p>Best regards,<br>BSNB Banking Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send({ message: "Password reset email sent successfully" });

    } catch (err) {
        console.error('Password reset error:', err);
        return res.status(500).send({ message: "Error sending password reset email" });
    }
};

// Reset Password with Token
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
        return res.status(400).send({ message: "Token and new password are required" });
    }

    try {
        // Find user with valid reset token
        const [users] = await db.execute(
            'SELECT user_id, email FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
            [token]
        );

        if (users.length === 0) {
            return res.status(400).send({ message: "Invalid or expired reset token" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear reset token
        await db.execute(
            'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE user_id = ?',
            [hashedPassword, users[0].user_id]
        );

        res.status(200).send({ message: "Password reset successfully" });

    } catch (err) {
        console.error('Password reset error:', err);
        return res.status(500).send({ message: "Error resetting password" });
    }
};

// Verify Reset Token
const verifyResetToken = async (req, res) => {
    const { token } = req.params;
    
    if (!token) {
        return res.status(400).send({ message: "Token is required" });
    }

    try {
        const [users] = await db.execute(
            'SELECT user_id FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
            [token]
        );

        if (users.length === 0) {
            return res.status(400).send({ message: "Invalid or expired reset token" });
        }

        res.status(200).send({ message: "Token is valid" });

    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(500).send({ message: "Error verifying token" });
    }
};

// Change Password (for logged-in users)
const changePassword = async (req, res) => {
    const { user_id, currentPassword, newPassword } = req.body;
    
    if (!user_id || !currentPassword || !newPassword) {
        return res.status(400).send({ message: "User ID, current password, and new password are required" });
    }

    try {
        // Get current user data
        const [users] = await db.execute(
            'SELECT password FROM users WHERE user_id = ?',
            [user_id]
        );

        if (users.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }

        // Verify current password
        const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, users[0].password);
        if (!isCurrentPasswordCorrect) {
            return res.status(401).send({ message: "Current password is incorrect" });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await db.execute(
            'UPDATE users SET password = ? WHERE user_id = ?',
            [hashedNewPassword, user_id]
        );

        res.status(200).send({ message: "Password changed successfully" });

    } catch (err) {
        console.error('Password change error:', err);
        return res.status(500).send({ message: "Error changing password" });
    }
};

module.exports = { 
    registerUser, 
    readUser, 
    loginUser, 
    updateUser, 
    deleteUser, 
    allUsers,
    requestPasswordReset,
    resetPassword,
    verifyResetToken,
    changePassword
};