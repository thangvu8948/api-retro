const db = require('../DbConnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Account = {
    getAllAccount: function (callback) {
        return db.query('Select * from account', callback);
    },

    findAccountByCredentials: async function (email, password) {
        console.log(email + " " + password);
        let sql = "SELECT * FROM account where Email = ?"
        return new Promise((resolve, reject) => {
            db.query(sql, email, function (err, response) {
                if (err) {
                    return (new Error({error: "Invalid Login"}));
                }
                console.log(response[0]);
                if (response.length > 0) {
                    const user = response[0];
                    console.log(user.Password);
                    console.log(password);
                    const isSuccess = bcrypt.compare(password, user.Password);
                    if (isSuccess) {
                        resolve(user)
                    } else {
                        reject(new Error({ error: "Invalid login" }));
                    }

                } else {
                    console.log("No Account match");
                    reject(new Error({ error: "Invalid login" }));
                }
            })
        })
    },

    findOne: async function (id) {
        console.log("id: " + id);
        let sql = "SELECT user.* FROM user JOIN account on user.Id = account.Id where user.Id = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, id, function (err, response) {
                if (err) {
                    reject(new Error({ error: "User Not Found" }));
                } else {
                    if (response.length === 0) {
                        resolve(null);
                    } else
                        resolve(response[0]);
                }
            })
        })
    },

    getInfoById: function(req, res) {
        res.send({user: req.user});
    },

    generateAuthToken: async function (user) {
        return new Promise((resolve, reject) => {
            const token = jwt.sign({ id: user.Id }, "THANG1712763");
            console.log(token)
            if (token) { resolve(token) } else {
                reject(new Error("Generate token failed"));
            };
        })

    },
}

module.exports = Account;