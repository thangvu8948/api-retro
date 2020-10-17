const bodyParser = require("body-parser");
var express = require("express");
var body_parser = require("body-parser");
var routes = require('./routes');

var app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

var server = app.listen(3000, function() {
    console.log("Server listening on port " + server.address().port);
})
app.use('/', routes);

module.exports = app;