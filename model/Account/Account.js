var db = require('../DbConnection');

var Account = {
    getAllAccount:function(callback) {
        return db.query('Select * from account', callback);
    }
}

module.exports = Account;