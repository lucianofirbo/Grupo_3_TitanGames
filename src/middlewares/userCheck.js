module.exports = (req, res, next) => {
    if(req.session.userLogged){
      next()
    }else{
        res.send('no pa tenes que loguearte')
    }
}