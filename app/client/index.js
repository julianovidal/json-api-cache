'use strict';

var request = require('request');
var config = require('../../config/server').load();

module.exports = {

  call: function(path, queryStr, callback) {

    var uri = config.ws + ( config.ws.endsWith('/') ?  path : '/' + path );
    
    request({ 
      method: 'GET', 
      json: true, 
      uri: uri,
      qs: queryStr
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(null, body);
      } else {
        callback(error, null);
      }
    });
  }
}