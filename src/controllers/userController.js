const { getUsers, saveUserDb } = require('../data/dataBase');

module.exports = {

    indexProfile: (req, res) => {
        res.render('users/profile');
    }, 

    checkLogin: (req, res) => {

            getUsers.filter(user => {
                if (user.email == req.body.email) {
                    if(user.password == req.body.pass) {
                        console.log('esa');
                    } else {
                        console.log('mal la pw')
                    }
                } else {
                    console.log('no se encontro el email')
                }
            })

    },

    createUser: (req,res) => {

        let lastId = 1;
        getUsers.forEach(element => {
            if (element.id > lastId) {
                lastId = element.id;
            };
        })

        let newUser = {
            id: lastId+1,
            user: req.body.user,
            email: req.body.email,
            password: req.body.pass
        }

        getUsers.push(newUser);

        saveUserDb(getUsers);

        res.redirect('/')

    }

}