const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3000;

/* Setting up the server */ 

app.listen(port, () => {
    console.log(`App listening on localhost:${port}`);
});

/* Middlewares */

app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));
app.use(express.static('./public'));
app.use(session({secret: 'TitanGames'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Setting up routes */

const indexRouter = require('./routes/indexRouter');
app.use('/', indexRouter);

const productRouter = require('./routes/productRouter');
app.use('/product', productRouter);

const adminRouter = require ('./routes/adminRouter');
app.use('/admin', adminRouter);

const userRouter = require('./routes/userRouter');
app.use('/user', userRouter);