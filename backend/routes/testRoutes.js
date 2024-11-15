/* 
------------>We can use Postman program to test<------------
*/

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router(); //creating router object

router.get('/protected', authMiddleware, (req, res) => {
    res.json({msg: "You have accessed a protected route", user: req.user});
});

router.get('unprotected', /*no middleware*/ (req,res) =>{
    res.json({msg: "You have accessed an uprotected route"});
});

module.exports = router;