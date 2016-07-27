'use strict';

var config = require('../../config/server').load();

var cache = config.type == 'redis' ? require('../cache/redis') : require('../cache/memcached');

module.exports = function(app) {
  
  app.get(config.contextRoot, function (req, res) {
    var url = req.url;
    var path = req.path;
    var queryStr = req.query;

    if(config.ordParam && config.ordParam.value && config.ordParam.removeIfPresent && queryStr[config.ordParam.value] ) {
      var ordParamVal = queryStr[config.ordParam.value];
      delete queryStr[config.ordParam.value];
      url = url.replace(config.ordParam.value + '=' + ordParamVal, '');
    }

    cache.get(url, path, queryStr, function (error, result) {
      if(error) {
        console.log(error);
      }
      res.json(result);
    });

  });

};