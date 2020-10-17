const bodyParser = require("body-parser");
var express = require("express");
var body_parser = require("body-parser");
var routes = require('./routes');

var app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
})
app.use('/', routes);

module.exports = app;