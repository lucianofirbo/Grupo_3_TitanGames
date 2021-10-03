module.exports = function(req,res,next){
    if(req.cookies.TitanGamesUser){
        req.session.user = req.cookies.TitanGamesUser;
        res.locals.user = req.session.user
    }
    next()
}