const router = require('express').Router();
const reservationControllers = require('../controllers/reservationControllers')
 
 
// Creating user registration route
router.post('/reservations', reservationControllers.createReservation)
 
 
// exporting the router
module.exports = router;