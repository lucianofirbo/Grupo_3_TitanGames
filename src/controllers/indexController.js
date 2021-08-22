const path = require('path');

module.exports = {

    index: (req, res) => {
        res.render('users/index');
    },
    politics: (req, res) => {
        res.render('users/privacyPolitics');
    },
    about: (req, res) => {
        res.render('users/aboutUs');
    },
    search: (req, res) => {
        res.render('users/search');
    }
    
}