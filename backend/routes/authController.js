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
                         {expiresIn: '1h'}
           );
           res.status(201).json({msg:`User ${newUser.name} registered successfully.`, token})
        }
    }