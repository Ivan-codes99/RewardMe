require('dotenv').config({path: '../.env'}); 
const mongoose = require('mongoose');  

const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');

    } catch (err) { 
        console.error(err.message);
        process.exit(1);
    }
};
console.log('MongoDB URI:', process.env.MONGO_URI);

module.exports = connectDB; 