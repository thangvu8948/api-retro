var mysql = require("mysql");
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'1111',
    database: 'sakila',
    port:'3306'
})

module.exports = connection;