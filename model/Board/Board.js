var db = require('../DbConnection');

var Board = {
    getAllBoard:function(callback) {
        return db.query('Select * from board_info', callback);
    }
}

module.exports = Board;