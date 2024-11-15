const User = require('../models/User'); //import User model
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');

async function register(req, res) {
        //check if user exists in database
        if (await User.findOne({email: req.body.email}))
        {
            res.status(400).json({msg: "User already exists"});
        } 
        //create new user
        else{
            const newUser = new User(req.body);
            const salt = await bcrypt.genSalt(10);

            newUser.password = await bcrypt.hash(newUser.password, salt);
            await newUser.save();
            

           const token = jwt.sign({id: newUser.userID, role: newUser.role},
                         process.env.JWT_SECRET,
                         {expiresIn: '1h'});
           res.status(201).json({msg:`User ${newUser.name} registered successfully.`, token})
        }
    }

async function login(req, res) {
    //check if user exists by email
    try {

        const user = await User.findOne({ email: req.body.email });// if a matching document is found, the  <- user variable 
        if (!user) {                                                  //will be an object representing the user document retrieved
            return res.status(400).json({msg: "Invalid credentials"});//from the MongoDB database, this object will be an instance
        }                                                             // of the Mongoose model: User

        //verify password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch){
            return res.status(400).json({msg: "Invalid credentials"});
        }

        //Generate JWT token
        const token = jwt.sign(
            {id: user.userID, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        // Send response with token
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
}