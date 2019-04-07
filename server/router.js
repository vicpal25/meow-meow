
//Controller references
const Authentication = require('./api/controllers/authentication');
const ImageController = require('./api/controllers/image.controller');

//Passport service provider
const passportService = require('./services/passport');
const passport = require('passport');
//React stuff..Server Side rendering

const requireAuth = passport.authenticate('jwt', {session: false })
const requireSignin = passport.authenticate('local', {session: false })
const session = require('express-session');
const cookieSession = require('cookie-session')

module.exports = function(app) {

        // session middleware with passport
    app.use(session({
        secret: process.env.SESSION_SECRET || 'running a marathon',
        resave: false,
        saveUninitialized: false,
        email: ''
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.get('/images/', ImageController.index);
    app.get('/images/bundle', ImageController.bundle);
    app.get('/favorites/:user', ImageController.favorites);
    app.get('/favorites/:user/:url', ImageController.isItFavorite);
    app.delete('/favorites/:user/:url', ImageController.removeFavorite);
    app.post('/favorites/', ImageController.addToFavorites);
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);

}