var express = require("express");
var body_parser = require("body-parser");
var routes = require('./routes');
var cors = require('cors')


const app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
routes(app);


app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})
const PORT = process.env.PORT || 8000;
var server = app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
})

module.exports = app;