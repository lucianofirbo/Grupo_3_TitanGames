module.exports = (req, res, next) => {
    if(req.session.userLogged){
      next()
    }else{
        res.redirect('/user/login')
    }
}