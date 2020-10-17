var mysql = require("mysql");
var connection = mysql.createPool({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'bda2d2f6223b5b',
    password:'eb763e75',
    database: 'heroku_af196c9c76bbcff'
})

module.exports = connection;