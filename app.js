const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers/api');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3306;

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
//handlebars
//app.use(); mounts middleware for all routes of the app (or those matching the routes specified if you use app.use('/ANYROUTESHERE', yourMiddleware());
app.use(session(sess));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>  console.log(`App listening at http://localhost:${PORT} 🚀`));
});