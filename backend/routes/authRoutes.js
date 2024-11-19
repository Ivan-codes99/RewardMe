const express = require('express'); //importing express
//--------- importing registration and login functions
const {register, login} = require ('../controllers/authController');


const router = express.Router(); //creating router object
//define two routes, one for registering a user, one for logging in
router.post('/register', (req, res) => { //req represents incoming request, res is response;]
    register(req, res);
    
});

router.post('/login', (req, res) => {
    login(req, res);
    
});

module.exports = router;
