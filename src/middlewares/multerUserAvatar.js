const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({

    destination: (req, file, callback) => {

        callback(null, path.join(__dirname, '../../public/img/users'));

    },

    filename: (req, file, callback) => {

        callback(null, 'user-' + Date.now() + path.extname(file.originalname));

    }

});

const  fileUpload = multer({ storage });

module.exports = fileUpload;