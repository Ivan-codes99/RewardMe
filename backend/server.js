const express = require('express'); //importing express library
const connectDB = require('./config/db'); //importing the connectDB function to connect to mongoDB
const authRoutes = require('./routes/authRoutes'); //importing authRoutes 

require('dotenv').config(); //loading environment variables from .env file into process.env
const app = express(); //initializing express

//connect to database
connectDB();
//---------
app.use(express.json()); //middleware to parse incoming requests with JSON payloads
//---------

// when an HTTP GET request is received at the root URL ('/'), the callback function is executed
// the callback function takes in two parameters, req (the request object) and res (the response object)
// the res.send() method sends a response of 'API is running...' to the client
// the req parameter represents the HTTP request and contains information about the request
app.get('/', (req, res) => {
    res.send('API is running...');
  });

app.use('/api/auth', authRoutes);
  // starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); //starting the server on port 5000