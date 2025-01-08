const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    //Verify token from request headers
    let token;
    try {
        token = req.headers.authorization.split(' ')[1];
    }

    catch(error) {
        res.status(401).json({msg: "Authorization denied"});
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: "Token is not valid"});
            }
            
            req.user = decoded;
            next()
        });
    }
    catch (error) {
        res.status(401).json({ msg: "Authorization denied" });
    }
}

module.exports = authMiddleware;


