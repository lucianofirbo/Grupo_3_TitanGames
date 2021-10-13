module.exports = function(req,res,next){
    if(req.cookies.TitanGamesUser){
        req.session.userLogged = req.cookies.TitanGamesUser;
        res.locals.userLogged = req.session.userLogged
    }
    next()
}