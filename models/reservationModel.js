const mongoose = require('mongoose');
 
const reservationControllers = new mongoose.Schema({
 
    userId: {
        type: Number,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    numberOfGuests : {
        type : Number,
        required : true
    }
 
})
 
 
const Reservation = mongoose.model('reservation', reservationControllers)
module.exports = Reservation;