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

    var customCacheTTL = getCustomCacheTTL(req.headers);

    cache.get(url, path, queryStr, customCacheTTL, function (error, result) {
      if(error) {
        console.log(error);
      }
      res.json(result);
    });

  });

};

var getCustomCacheTTL = function (requestHeaders) {
  if( requestHeaders['cache-control'] && requestHeaders['cache-control'] != 'max-age=0' && requestHeaders['cache-control'] != 'no-cache') {
    if(requestHeaders['cache-control'].indexOf('max-age=') == 0) {
      var ttl = requestHeaders['cache-control'].replace('max-age=', '');
      try {
        ttl = parseInt(ttl);
        return ttl;
      } catch (err) {
        console.log('Error while parsing custom ttl for header ' + requestHeaders);
        return -1;
      }
    }
  }
  return -1;
}