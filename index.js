// importing the packages (express)
const express = require('express');
// const mongoose = require('mongoose');
const connectDatabase = require('./database/database');
const dotenv = require('dotenv')

// Creating an express app
const app = express();

//express json config
app.use(express.json())

//dotenv Configuration
dotenv.config()

//Connecting to databse
connectDatabase()

// Defining the port
const PORT = process.env.PORT;

// Making a test endpoint
//Endpoints: POST, GET, PUT, DELETE
app.get('/test', (req, res) => {
    res.send("Test API is working!...")
})


// http://localhost:5000/test

//Configuring routes of user
app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/reservationRoutes'));
app.use('/api', require('./routes/appointmentRoutes'));


//http://localhost:5000/api/user/create

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}!`)
})


