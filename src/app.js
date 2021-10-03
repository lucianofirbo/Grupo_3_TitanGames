const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');
const cookieParser = require('cookie-parser');

/* Setting up the server */ 

app.listen(port, () => {
    console.log(`App listening on localhost:${port}`);
});

/* Middlewares */

app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}))
app.use(express.static('./public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
    secret: "titanGames",
    resave: false,
    saveUninitialized: true,
}));

/* Setting up routes */

const indexRouter = require('./routes/indexRouter');
app.use('/', indexRouter);

const productRouter = require('./routes/productRouter');
app.use('/product', productRouter);

const adminRouter = require ('./routes/adminRouter');
app.use('/admin', adminRouter)

const userRouter = require ('./routes/userRouter');
app.use('/user', userRouter)

