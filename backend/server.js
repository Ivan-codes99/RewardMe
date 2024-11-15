const express = require('express'); //importing express library
const connectDB = require('./config/db'); //importing the connectDB function to connect to mongoDB


//-----------import routes
const authRoutes = require('./routes/authRoutes'); 
const rewardRoutes = require('./routes/rewardRoutes'); 
const eventRoutes = require('./routes/eventRoutes'); 
const testRoutes = require('./routes/testRoutes');
//const userRoutes = require('./routes/userRoutes');
const path = require('path');


require('dotenv').config(); //loading environment variables from .env file into process.env
const app = express(); //initializing express

//connect to database
connectDB();
//---------

app.use(express.json()); //middleware to parse incoming requests with JSON payloads
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // middleware to make uploaded images accesible

//---------

// when an HTTP GET request is received at the root URL ('/'), the callback function is executed
// the callback function takes in two parameters, req (the request object) and res (the response object)
// the res.send() method sends a response of 'API is running...' to the client
// the req parameter represents the HTTP request and contains information about the request

//-------------
app.get('/', (req, res) => {
    res.send('API is running...');
  });


//------------- Test route
app.use('api/testing', testRoutes);
//------------- Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/rewards', rewardRoutes);  // Reward management routes
app.use('/api/events', eventRoutes);  // Event management routes
//app.use('/api/users', userRoutes);      // New user routes for profile and setting
//-------------

// starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); //starting the server on port 5000