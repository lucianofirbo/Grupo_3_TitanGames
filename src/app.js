const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const localsCheck = require('./middlewares/localsCheck');
const createError = require('http-errors');

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
    saveUninitialized: true
}));
app.use(localsCheck);

/* Setting up routes */

const indexRouter = require('./routes/indexRouter');
app.use('/', indexRouter);

const productRouter = require('./routes/productRouter');
app.use('/product', productRouter);

const adminRouter = require ('./routes/adminRouter');
app.use('/admin', adminRouter)

const userRouter = require ('./routes/userRouter');
app.use('/user', userRouter)

/* Routes for Apis */
const apiProductsRouter = require('./routes/api/productRouter');
app.use('/api', apiProductsRouter);

const apiCategoriesRouter = require('./routes/api/categoriesRouter');
app.use('/api/categories', apiCategoriesRouter);

const apiUsersRouter = require('./routes/api/usersRouter');
app.use('/api', apiUsersRouter);

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
    next(createError(404));
}); 

// error 
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/
