function roleMiddleware(allowedRoles) {
    
    return (req, res, next) => {
    // Check if the user role mateches allowed roles.    

    if (!req.user) {
        res.status(403).json({"msg": "Access denied."});
    }
    
    else {
        role = req.user.role
        if (allowedRoles.includes(role)) {
            next();
        }
        else {
            res.status(403).json({"msg": "Access denied."});
        }
    }
    
    }
}

module.exports = roleMiddleware;