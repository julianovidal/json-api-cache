'use strict';

module.exports =  {

  load: function() {
    var env = process.env.NODE_ENV || 'development';

    var settings = {
      type: 'memcached', //Use memcached or redis
      redis: {
        host: '127.0.0.1',
        port: 6379
      },
      memcached: {
        host: '127.0.0.1',
        port: 11211      
      },
      contextRoot: '/*',
      ordParam: { 
        value: 'rand', 
        removeIfPresent: true 
      }
    };
    
    switch (env) {
    	case 'production':
        settings.ws = 'http://localhost/';
        settings.ttl = 300; // Time to Leave 
        break;
      case 'development':
      default:
        settings.ws = 'http://localhost/';
        settings.ttl = 300; // Time to Leave 
        settings.type = 'memcached'; //Use memcached or redis
        break;
    }
    
    return settings;
  } 
}

