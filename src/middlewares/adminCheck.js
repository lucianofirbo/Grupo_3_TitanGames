module.exports = (req, res, next) => {
    if(req.session.userLogged && req.session.userLogged.rol == 1 ){
      next()
    }else{
        res.redirect('/')
    }
}