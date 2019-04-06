

const Cat = require('../../model/cat');
const CATS_API =require('../../components/catsapi')
const async = require('async');

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
        // Find MakretID by market code
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