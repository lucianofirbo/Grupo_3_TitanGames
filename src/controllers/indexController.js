const path = require('path');

module.exports = {

    index: (req, res) => {
        res.render('index');
    },
    
    politics: (req, res) => {
        res.render('privacyPolitics');
    },
    about: (req, res) => {
        res.render('aboutUs');
    },
    search: (req, res) => {
        res.render('search');
    }
}