const fs = require('fs');

module.exports = {

    getProducts : JSON.parse(fs.readFileSync('./src/data/products.json', 'utf-8')),

    getUsers : JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8')),

    writeJson: (json, dataBase) => {
        fs.writeFileSync(`./src/data/${json}.json`, dataBase)
    },

    saveProduct: (product) => {
        
        try {
            let db = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf-8'));
            db.push(product);
            fs.writeFileSync(`./src/data/products.json`, JSON.stringify(db))
            return true;
        } 
        catch {
            return false;
        }

    }

}