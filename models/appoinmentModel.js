const mongoose = require('mongoose');

const appointmentControllers = new mongoose.Schema({

    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})


const Appointment = mongoose.model('appointment', appointmentControllers)
module.exports = Appointment;