module.exports = (req,res,next) => {
    if(req.session.userLogged){
        res.locals.userLogged = req.session.userLogged
    }
    next()
}