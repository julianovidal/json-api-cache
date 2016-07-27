'use strict';

var config = require('../../config/server').load();

var cache = config.type == 'redis' ? require('../cache/redis') : require('../cache/memcached');

module.exports = function(app) {
  
  app.get('*', function (req, res) {
    var url = req.url;
    var path = req.path;
    var queryStr = req.query;

    cache.get(url, path, queryStr, function (error, result) {
      if(error) {
        console.log(error);
      }
      res.json(result);
    });

  });

};