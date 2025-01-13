const express = require('express'); 
//--------- importing registration and login functions
const {register, login} = require ('../controllers/authController');

const router = express.Router(); 
//routes for registering and logging in
router.post('/register', (req, res) => {
    console.log("Registering user...")
    register(req, res);
});

router.post('/login', (req, res) => {
    console.log("Logging in...")
    login(req, res);
});

module.exports = router;
