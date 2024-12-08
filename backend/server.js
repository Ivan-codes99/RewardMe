const express = require('express'); 
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');  
const rewardRoutes = require('./routes/rewardRoutes'); 
const userRoutes = require('./routes/userRoutes');
const path = require('path');

console.log('MongoDB URI:', process.env.MONGO_URI); 
require('dotenv').config(); 


const app = express(); 

//connect to database
connectDB();
//-------------

app.use(express.json()); //middleware to parse incoming requests with JSON payloads
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // middleware to make uploaded images accesible

app.get('/', (req, res) => {
    res.send('API is running...');
  });


//------------- Routes
app.use('/api/auth', authRoutes); 
app.use('/api/rewards', rewardRoutes);  
app.use('/api/users', userRoutes);      

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// starting the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 