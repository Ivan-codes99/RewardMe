require('dotenv').config({path: './.env'}); 
const express = require('express'); 
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');  
const rewardRoutes = require('./routes/rewardRoutes'); 
const userRoutes = require('./routes/userRoutes');
const upload = require('./middleware/upload');
const path = require('path');

const app = express(); 
//connect to database
connectDB();

//middleware to parse incoming requests with JSON payloads
app.use(express.json()); 

// Error-handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next(); 
});

// middleware to make uploaded images accesible
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

//route for handling file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
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