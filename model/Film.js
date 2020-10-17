var db = require('./DbConnection');

var Film = {
    getAllFilm:function(callback) {
        return db.query('Select * from film', callback);
    }
}

module.exports = Film;