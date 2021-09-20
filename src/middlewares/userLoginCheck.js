module.exports = (req, res, next) => {
    if(req.session.userLogged){
       return res.send('no podes ver esto PA ya estas lo guea do')
    }
    next()
}