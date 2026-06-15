const nodemailer = require('nodemailer')
const config = require('./config')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: config.mail.user,
        pass: config.mail.pass
    }
});

module.exports = transporter;
