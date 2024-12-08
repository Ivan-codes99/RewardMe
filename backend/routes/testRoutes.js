/* 
------------>We can use Postman program to test<------------
*/
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router(); 

router.get('/protected', authMiddleware, (req, res) => { 
    res.json({msg: `You have accessed a protected route, welcome ${req.user.role} `, user: req.user});
});

router.get('unprotected', /*no middleware*/ (req,res) =>{
    res.json({msg: "You have accessed an uprotected route"});
});

router.get('/roleTest', authMiddleware, roleMiddleware(['admin']), (req, res) => {
    res.json({msg: `Welcome ${req.user.role} ${req.user.name}`})
});

module.exports = router;