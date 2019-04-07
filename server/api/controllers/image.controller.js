

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

    const cb = new asyncCallback();
    let collection = {};

    async.series([
        // Find MakretID by market code
        (callback) => {
            User.findOne({email : 'vicpal25@yahoo.com' }, (err, user) => {          
                
                // if(err) { return done(err, false);  }
                
                // if(!user) {
                //     done(null, false);
                // } 

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



                var responseJson = err ? JSON.stringify(err) : collection.favorites;
    
                res.status(err ? 500 : 200).json(responseJson).end();

            }

        );


}