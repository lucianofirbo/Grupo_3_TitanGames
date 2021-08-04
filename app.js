const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.listen(port, () => {
    console.log(`App listening on localhost:${port}`)
});

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'))
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/register.html'))
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/productDetail.html'))
});
