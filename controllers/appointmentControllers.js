const appointmentModel = require('../models/appoinmentModel');
const { response } = require("express");
const { checkout } = require("../routes/userRoutes");



const bookAppointment = async (req, res) => {

    // Step 1. Check incoming data
    console.log(req.body);

    // Step 2. De-structure the incoming data
    const { date, time, } = req.body;


    // Step 3. Validation (Validate the data)(if empty, stop the process and send response)
    if (!date || !time) {
        // res.send('Please fill all details')
        // res.status(400).json()
        return res.json({
            'sucess': false,
            'message': 'Plz enter all details!'
        })

    }

    if (time === '15:00') {
        return res.json({ success: false, message: 'The slot is unavailable.' });
    }



    // Step 4. Error Handling (Try Catch)
    try {
        // Step 5. Check if the user is already in the database (registered)
        const newAppointment = await appointmentModel.findOne({ date: date, time: time })

        // Step 5.1 If user Found: Send response
        if (newAppointment) {
            return res.json({
                'status': false,
                'message': 'Booking Already Exist!'
            })
        }

        if (new Date(date) <=
            new Date()) {
            return res.json({
                'status': false,
                message: 'Date must be in the future.'
            });

        }
        // Step 5.1.1 Stop the process
        //Done

        // Hashing/Encryption of the password



        // Step 5.2 if user is new:
        const newappointment = new appointmentModel({
            // Database Fields : Client's Value
            date: date,
            time: time,


        })

        // Save the database
        await newappointment.save()

        // Send the response
        res.json({
            'sucess': true,
            'message': 'Booking Confirmed'
        })



    } catch (error) {
        console.log(error)
        res.json({
            'sucess': false,
            "message": 'Internal Server Error!'
        })

    }




}






//exporting
module.exports = {
    bookAppointment
};