const reservationModel = require('../models/reservationModel');
const { response } = require("express");
const { checkout } = require("../routes/userRoutes");



const createReservation = async (req, res) => {

    // Step 1. Check incoming data
    console.log(req.body);

    // Step 2. De-structure the incoming data
    const { userId, eventDate, numberOfGuests } = req.body;


    // Step 3. Validation (Validate the data)(if empty, stop the process and send response)
    if (!userId || !eventDate || !numberOfGuests) {
        // res.send('Please fill all details')
        // res.status(400).json()
        return res.json({
            'sucess': false,
            'message': 'Plz enter all details!'
        })

    }


    // Step 4. Error Handling (Try Catch)
    try {
        // Step 5. Check if the user is already in the database (registered)
        const existingReservation = await reservationModel.findOne({ userId: userId, eventDate: eventDate, numberOfGuests: numberOfGuests });

        // Step 5.1 If user Found: Send response
        if (existingReservation) {
            return res.json({
                'status': false,
                'message': 'Reservation Already Exist!'
            })
        }

        if (new Date(eventDate) <=
            new Date()) {
            return res.json({
                'status': false,
                message: 'Event date must be in the future.'
            });

        }

        if (numberOfGuests <= 0) {
            return res.json({
                'status': false,
                message: 'Number of guests must be a positive number.'
            });
        }


        // Step 5.1.1 Stop the process
        //Do


        // Step 5.2 if user is new:ne
        const newReservation = new reservationModel({
            // Database Fields : Client's Value
            userId: userId,
            eventDate: eventDate,
            numberOfGuests: numberOfGuests


        });

        // Save the database
        await newReservation.save()

        // Send the response
        res.json({
            'sucess': true,
            'message': 'Reservation Added Sucesfully'
        })


        // Step 5.2.1 Hash the password
        // Step 5,2,2 Save to the database
        // 5.2.3 Send Sucessfull response


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
    createReservation
};