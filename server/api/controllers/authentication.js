const User = require('../../model/user');
const jwt = require('jwt-simple');
const config = require('../../config');

function tokenForUser(user) {
    const timestamp  = new Date().getTime();
    return jwt.encode({ sub : user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next){
    // req.session.user = req.user;
    res.send({token : tokenForUser(req.user) });
}

exports.signup = function(req, res, next){

    req.checkBody('email', 'A email is needed.').notEmpty();
    req.checkBody('password', 'A valid password is needed.').notEmpty();
 
    let errors = req.validationErrors();

    console.log(errors);

    if (errors) {
        return res.status(500).send(errors);
    }
 
    const email = req.body.email;
    const password = req.body.password;


    User.findOne({ 'email' : email }, function(err, existingUser) {

        if(err) { return next(err); }

        if(existingUser) {
            return res.status(422).json('email in use');
        }

       const user = new User({
           "email": email,
           "password" : password
       })

       user.save(function(err) {

        if(err) { return next(err); }

        res.json({ token : tokenForUser(user) });

       });

    })
    

    


}