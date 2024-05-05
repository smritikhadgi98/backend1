const userModel = require('../models/userModel')



const createContact = async (req, res) => {
    // 1. check incoming data
    console.log(req.body);

    // 2. destructre the incoming data
    const { name, phone, email } = req.body;

    // 3. validtate the data(if empty, stop the process and send response)
    if (!name || !phone || !email) {
        // res.send("Please enter all fields!")
        res.json({
            "success": false,
            "message": "Please enter all feilds!"
        })
    }
    // 4. error handling(try catch)
    try {
        // 5. check if the user is already registered
        const existingUser = await userModel.findOne({ phone: phone })

        // 5.1 if user is found :Send response
        if (existingUser) {
            // 5.1.1 stop the process
            return res.json({
                "status": false,
                "message": "Number Already Exists!"
            })
        }


        // 5.2 if user is new
        const newUser = new userModel({
            //database field:client's value
            name: name,
            phone: phone,
            email: email,

        })

        //Save to databse 
        await newUser.save()

        //Send the response
        res.json({
            "success": true,
            "message": "Number Added Successfully!"
        })
    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "Internal Server Error!"
        })
    }

}



//Exporting
module.exports = {
    createContact
}




