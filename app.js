const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.listen(port, () => {
    console.log(`App listening on localhost:${port}`)
})

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
})