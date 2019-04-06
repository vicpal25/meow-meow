'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/tntservice-dev'
  },
  sequelize: {
    uri: 'mysql://bn_wordpress:Uveifee4ae@nlr-stage-rr.cgmovbgsc28q.us-west-2.rds.amazonaws.com:3306/bitnami_wordpress',
    options: {
      logging: console.log,
      storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  // uri: 'mysql://bn_wordpress:XFVsGprkrrY6QcT9@rds.nlr.tronc.com:3306/bitnami_wordpress',

  // Sequelize connecton opions
/*
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },
*/
 new_relic : {
  tnt_application_id: '42717448',
  api_key: 'fc3937aeff26bbce68b0549433a00011ea0c3850'
},
  // Seed database on startup
  seedDB: true,
  tmp_dir : './server/api/global_suppression/tmp_processing',    
  // Logger
  log: {
    level: 'info',
    outputs: {
        api: ['console'], // console,file,db,cw
        access: ['console'] // console,file,db,cw
    },
    filelog: '' // '/var/log/tntserv/nodejs.log'
  }

};
