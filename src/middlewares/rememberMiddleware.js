const { getUsers } = require('../data/dataBase');

function rememberMiddleware (req, res, next) {
    
    try {
        if (req.cookie.recordar != undefined && req.session.userLogged == undefined) {
            
            getUsers.filter(user => {
            if (user.email == req.cookie.recordar) {
                userToLog = user;
            }
        })
        
        req.session.userLogged = userToLog;
        
        } 
        next();
    }
    catch {
        next();
    }

}

module.exports = rememberMiddleware;
