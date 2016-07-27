	// set up ========================
var express  = require('express');
var app      = express();                        // create our app w/ express
var morgan = require('morgan');                  // log requests to the console (express4)
var path = require('path');

// configuration =================

app.use(morgan('dev'));                                         // log every request to the console

require(path.join(__dirname, '/app/routes'))(app);

// listen (start app with node server.js) ======================================
app.listen(9000);
console.log("App listening on port 9000");




