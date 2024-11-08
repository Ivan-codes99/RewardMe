const express = require('express'); //importing express

const router = express.Router(); //creating router object

//define two routes, one for registering a user, one for logging in
router.post('/register', (req, res) => { //req represents incoming request, res is response;]
    res.send("post request to /register received");
    res.sendStatus();
});

router.post('/login', (req, res) => {
    res.send("post request to /login received");
    res.sendStatus();
});

module.exports = router;