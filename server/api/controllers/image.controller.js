

const Cat       = require('../../model/cat');
const CATS_API  = require('../../components/catsapi')
const async     = require('async');
const User      = require('../../model/user');
const Favorites = require('../../model/favorites');


// For async callback
const asyncCallback = function(){

    // private
    var __callback;

    return function(callback, err, result){

        // Prevent getting "Callback was already called"
        if(__callback !== callback)
            callback(err, result);

        __callback = callback;
    }
}
exports.index = (req, res, next) =>{

    CATS_API.searchImage(req.query)
        .then(function(result){
            res.status(200).json(result);
        })

}

exports.bundle = (req, res) => {

    let bundle = {}

    const cb = new asyncCallback();

    async.series([
        // Find MakretID by market code and TODO..refactor limit & callback
        (callback) => {
            CATS_API.searchImage({mime_types: 'PNG', 'limit' : 1 })
            .then(function(result){                
                bundle.png = result;
                cb(callback, null,  bundle.png);
            })
        },
        (callback) => {
            CATS_API.searchImage({mime_types: 'JPG', 'limit' : 1 })
            .then(function(result){                
                bundle.jpg = result;
                cb(callback, null,  bundle.jpg);
            })
        },
        (callback) => {
            CATS_API.searchImage({mime_types: 'GIF', 'limit' : 1 })
            .then(function(result){  
                bundle.gif = result;
                cb(callback, null,  bundle.gif);
            })
        }],
            (err,results) => {

                var responseJson = err ? JSON.stringify(err) : results;
    
                res.status(err ? 500 : 200).json(responseJson).end();

            }

        );


}

exports.favorites = (req, res) => {

    const user = req.params.user;
    const cb = new asyncCallback();
    let collection = {};
    async.series([
        // Find MakretID by market code
        (callback) => {
            User.findOne({email : user }, (err, user) => {      
                
                if(err) {                                
                    cb(callback, `Error finding user: err`, null);
                }
                
                if(!user) {
                    cb(callback, `User not found`, null);
                } 

                collection.user = user;
                cb(callback, null,  collection.user);

                
            })
        },
        (callback) => {

            Favorites.find({}, (err, favorites) => {
                collection.favorites = favorites;
                cb(callback, null,  collection.favorites);
            })
 
        }],
            (err,results) => {

                var responseJson = err ? err : collection.favorites;
    
                res.status(err ? 500 : 200).json(responseJson).end();

            }

        );


}

exports.addToFavorites = (req, res) => {

    req.checkBody('user', 'A user email is needed.').notEmpty();
    req.checkBody('url', 'A valid favorite url is needed.').notEmpty();
 
    let errors = req.validationErrors();

    if (errors) {
        return res.status(500).send(errors);
    }

    Favorites.create({ user_email: req.body.user, image_url: req.body.url }, function (err, small) {
        if (err) {
            res.status(500).json(err)
        }

        res.status(200).json('ok')

    });
      
}

exports.isItFavorite = (req, res) => {
    Favorites.findOne({ user_email: req.params.user, image_url: req.params.url }, function (err, fav) {

        if(err) {
            return res.status(500).json('Error finding fav.')
        }

        if(!fav) {
          return  res.status(404).json('not a favorite')
        } 
      
        res.status(200).json(fav)

    });
      
}

exports.removeFavorite = (req, res) => {
    Favorites.remove({ user_email: req.params.user, image_url: req.params.url }, function (err, fav) {

        if(err) {
            return res.status(500).json('Error finding fav.')
        }

        if(!fav) {
          return  res.status(404).json('not a favorite')
        } 
      
        res.status(200).json(fav)

    });
      
}