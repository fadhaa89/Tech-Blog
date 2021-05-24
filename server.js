const path = require('path');
//express//
const express = require('express');
///////////////////////////////////////
//controllers ///
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
////////handlelbars/////////////
const exphbs = require('express-handlebars');
//helper//
const hbs = exphbs.create({
    helpers
});
const session = require('express-session');
//connect-session-sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//sess
const sess = {
    secret: process.env.DB_SECRET,
    //cookie//
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, //this is to be checked every 10 minutes in advance//
        expiration: 1000 * 60 * 30 // and here it will be expired after 30 minutes//
    })
};
const app = express();
const PORT = process.env.PORT || 3001;
///---**************************---/////
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
//express.static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
//routes
app.use(routes);

sequelize.sync();
//port//
app.listen(PORT, () => {
    console.log(`App is listening on the port ${PORT}!`);
});