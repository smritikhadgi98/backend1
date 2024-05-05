const mongoose = require('mongoose');

const userContact = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    }
})

const Contact = mongoose.model('contact', userContact)
module.exports = Contact;