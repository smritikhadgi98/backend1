const userController= require('../controllers/userControllers')
const router = require('express').Router();


router.post('/users', userController.createContact)

//Exporting the router
module.exports=router