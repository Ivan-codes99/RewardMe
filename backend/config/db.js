

const mongoose = require('mongoose'); //importing mongoose library to connect to mongoDB
require('dotenv').config(); //loading environment variables from .env file into process.env

const connectDB = async () => { //async function to connect to mongoDB
    try {
        // the promise returned by mongoose.connect() is awaited to make sure that the connection is established before proceeding
        await mongoose.connect(process.env.MONGO_URI);//connecting to mongoDB using mongoose, await is used to wait for the promise to be resolved
        console.log('MongoDB connected...');
    } catch (err) { //this block will run if the promise is rejected
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;