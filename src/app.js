const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

/* Setting up the server */ 

app.listen(port, () => {
    console.log(`App listening on localhost:${port}`);
});

/* Setting up static folders */

app.use(express.static('./public'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/* Setting up routes */

const indexRouter = require('./routes/indexRouter');
app.use('/', indexRouter);

const productDetailRouter = require('./routes/productDetailRouter');
app.use('/productDetail', productDetailRouter);

const productCartRouter = require('./routes/productCartRouter');
app.use('/productCart', productCartRouter);

const privacyPoliticsRouter = require('./routes/privacyPoliticsRouter');
app.use('/privacyPolitics', privacyPoliticsRouter);

const aboutRouter = require('./routes/aboutRouter');
app.use('/aboutUs', aboutRouter);

const searchRouter = require('./routes/searchRouter');
app.use('/search', searchRouter);

const productLoadRouter = require('./routes/productLoadRouter');
app.use('/productLoad', productLoadRouter);

const profileRouter = require ('./routes/profileRouter');
app.use('/profile', profileRouter)