const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user:'bhumil.shah2608@gmail.com',
        pass:'ihci wjwg ypdl lklf'
    }
});

module.exports = transporter;