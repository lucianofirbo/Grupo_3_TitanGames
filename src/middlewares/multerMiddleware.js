const multer = require('multer');
const path = require('path');

let multerDiskStorage = multer.diskStorage({

    destination: (req, file, callback) => {

        callback(null, path.join(__dirname, '../../public/img/games'));

    },

    filename: (req, file, callback) => {

        callback(null, 'product-' + Date.now() + path.extname(file.originalname));

    }

});
let fileUpload = multer({ storage: multerDiskStorage });

module.exports = fileUpload;