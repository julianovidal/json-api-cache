'use strict'

var config = require('../../config/server').load();

var Memcached = require('memcached');
var memcached = new Memcached(config.memcached.host + ':' + config.memcached.port);

var client = require('../client');

module.exports = {
  
  get: function(url, path, queryStr, callback) {

    memcached.on("failure", function (err) {
      console.log("Error " + err);
    });

    memcached.get(url, function (err, value) {
      if (!value) {
        console.log('call client');
        client.call(path, queryStr, function (err, newvalue) {
      
          memcached.set(url, newvalue, config.ttl, function (err, value) {
            callback(err, newvalue);
          });

        });
      } else {
        console.log('found in memcached cache');
        callback(err, value);  
      }
    });
  }
}