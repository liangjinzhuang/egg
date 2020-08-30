'use strict';

/** @type Egg.EggPlugin */
//module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
//};


module.exports = {	
  mysql:  {	
    enable: true,	
    package: 'egg-mysql',	
  },
  cors: {
	  enable: true,
	  package: 'egg-cors'
	},
  redis:{
    enable: true,
    package: 'egg-redis',
  }
};