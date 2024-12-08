const express = require('express'); 
//--------- importing registration and login functions
const {register, login} = require ('../controllers/authController');


const router = express.Router(); 
//routes for registering and logging in
router.post('/register', (req, res) => {
    register(req, res);
    
});

router.post('/login', (req, res) => {
    login(req, res);
    
});

module.exports = router;
