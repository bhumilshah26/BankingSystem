const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user:'bhumil.shah2608@gmail.com',
        pass: process.env.APP_PASS
    }
});

module.exports = transporter;