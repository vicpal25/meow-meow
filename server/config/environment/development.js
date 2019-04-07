'use strict';

// Development specific configuration
// ==================================
module.exports = {

  log: {
    level: 'info',
    outputs: {
        api: ['console'], // console,file,db,cw
        access: ['console'] // console,file,db,cw
    },
    filelog: '' // '/var/log/tntserv/nodejs.log'
  }

};
