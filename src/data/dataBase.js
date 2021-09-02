const fs = require('fs');

module.exports = {

    getProducts : JSON.parse(fs.readFileSync('./src/data/products.json', 'utf-8')),

    getUsers : JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8')),

    saveDb: (database) => {
        fs.writeFileSync(`./src/data/products.json`, JSON.stringify(database));
    },

    saveProduct: (db) => {
                
        fs.writeFileSync(`./src/data/products.json`, JSON.stringify(db));

    }

}