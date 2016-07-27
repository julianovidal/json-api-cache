# json-api-cache

Cache JSON API requests into a Redis or Memcached server.

To import node projects run: `npm install`

To start the server: `npm start`

##Configuration

Open the file `config/server.js`
 
### Using Redis as cache server
By default the application will use memcached as cache container. If you want to use [Redis](http://redis.io) instead, in the config file change the value of 'type' to 'redis' and config the Redis host and port.

```javascript
switch (env) {
	case 'production':
    settings.ws = 'http://mycacheserver.com/';
    settings.ttl = 300; // Time to Leave 
    settings.type = 'redis';
	settings.redis = { 
	  host: '1982.168.0.1',
	  port: 6379 
	};
    break;
  case 'development':
  default:
    settings.ws = 'http://localhost/';
    settings.ttl = 300; // Time to Leave 
    settings.type = 'memcached';
    break;
}
```

### Using Memcached as cache server
By default the application will use memcached as cache container. Make sure that in the config file the value of 'type' is set to 'memcached' and config the Redis host and port.

```javascript
switch (env) {
	case 'production':
    settings.ws = 'http://mycacheserver.com/';
    settings.ttl = 300; // Time to Leave 
    settings.type = 'memcached';
	settings.memcached = { 
	  host: '1982.168.0.1',
	  port: 6379 
	};
    break;
  case 'development':
  default:
    settings.ws = 'http://localhost/';
    settings.ttl = 300; // Time to Leave 
    settings.type = 'memcached';
    break;
}
```


### Change contextRoot pattern
If you need to only listen to a custom contextRoot path, change the value of the contextRoot parameter.

```javascript
switch (env) {
	case 'production':
    settings.ws = 'http://localhost/';
    settings.ttl = 300; // Time to Leave 
    settings.contextRoot: '/myCustomCtxRoot/*';
    break;
  case 'development':
  default:
    settings.ws = 'http://localhost/';
    settings.ttl = 300; // Time to Leave 
    break;
}
```

### Using custom random (ord) parameters on your request.
If you need send custom rand parameters on the http request for caching request purposes and you may want them to be ignored.

```javascript
switch (env) {
	case 'production':
    settings.ws = 'http://localhost/';
    settings.ttl = 300; // Time to Leave 
    settings.ordParam = { 
      value: 'ord', 
      removeIfPresent: true
    };
    break;
  case 'development':
  default:
    settings.ws = 'http://localhost/';
    settings.ttl = 300; // Time to Leave 
    break;
}
```

### TTL
You can setup the TTL on the config file as well.
The parameter hgas a time unit of seconds.

```javascript
switch (env) {
  case 'production':
    settings.ws = 'http://localhost/';
    settings.ttl = 20; // Time to Leave in seconds
    break;
  case 'development':
  default:
    settings.ws = 'http://localhost/';
    settings.ttl = 10; // Time to Leave 
    break;
}
```

You can setup a custom TTL for a certain requests.
Just use the HTTP Header parameter 'cache-control'.
Set it to the max-age=<YOUR_VALUE> and it will overwrite the default set in the config file

```shell
curl 'http://localhost:9000/json/get_posts/?post_type=taxonomy' -H 'Host: localhost:9000' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: max-age=1500'
```
