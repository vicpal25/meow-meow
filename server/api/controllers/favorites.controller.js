

const Favorite = require('../../model/favorites');
const CATS_API =require('../../components/catsapi')

const User = require('../../model/user');
const Favorites = require('../../model/favorites');


function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
      res.status(statusCode).send(err);
    };
  }
  
  function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
      if (entity) {
        res.status(statusCode).json(entity);
      }
    };
  }
  

// Gets a list of Favorites
exports.index = function(req, res) {
  
  res.status(200).json('ok')
  // User.findOne({email : email }, function(err, user) {
  //   console.log(`'usssserr bro'5bc23593a2369e64c0035c46 `)
  //   console.log(user);

  //   if(err) { return done(err, false);  }
    
  //   if(!user) {
  //       done(null, false);
  //   } 

    // user.comparePassword(passowrd, function(err, isMatch) {

    //     console.log(isMatch);

    //     if(err) { return done(err, false);  }

    //     if(!isMatch) {  done(null, false);  }

    //     return done(null, user);

    // })

// })


    };

  exports.show = function(req, res) {
    Favorite.findAll()
      .then(responseWithResult(res))
      .catch(handleError(res));
  };
  
  exports.place = function(req, res) {
    Favorite.findAll()
      .then(responseWithResult(res))
      .catch(handleError(res));
  };
  
  exports.remove = function(req, res) {
    Favorite.findAll()
      .then(responseWithResult(res))
      .catch(handleError(res));
  };
  