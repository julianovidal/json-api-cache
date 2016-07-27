'use strict'

var config = require('../../config/server').load();

var redis = require("redis"); 
var rClient = redis.createClient(config.redis);

var client = require('../client');

module.exports = {
  
  get: function(url, path, queryStr, customCacheTTL, callback) {
    
    rClient.on("error", function (err) {
      console.log("Error " + err);
    });
    
    rClient.get(url, function (err, value) {
      if (!value) {
        console.log('call client');
        client.call(path, queryStr, function (err, value) {
          rClient.set(url, JSON.stringify(value), callback(err, value));
          var ttl = customCacheTTL && customCacheTTL > 0 ? customCacheTTL : config.ttl;
          rClient.expire(url, ttl);
        });
      } else {
        console.log('found in redis cache');
        callback(err, JSON.parse(value));  
      }
    });
  }
}