
//Controller references
const Authentication = require('./api/controllers/authentication');
const ImageController = require('./api/controllers/image.controller');
const FavoritesController = require('./api/controllers/favorites.controller');

//Passport service provider
const passportService = require('./services/passport');
const passport = require('passport');
//React stuff..Server Side rendering

const requireAuth = passport.authenticate('jwt', {session: false })
const requireSignin = passport.authenticate('local', {session: false })
const session = require('express-session');

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

    app.get('/favorites', ImageController.favorites)
    app.get('/favorites/:id', FavoritesController.show)
    app.post('/favorites/:id', FavoritesController.place)
    app.delete('/favorites/:id', FavoritesController.remove)

    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
 


}