module.exports = (req, res, next) => {
    if(req.session.userLogged && req.session.userLogged.rol == 0 ){
      next()
    }else{
        res.send('a donde vas pa')
    }
}