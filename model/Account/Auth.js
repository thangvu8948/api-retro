const db = require('../DbConnection');
const bcrypt = require("bcrypt");
const Account = require('./Account');
const saltRounds = 10;
const Auth = {
    getAllAccount: function (callback) {
        return db.query('Select * from account', callback);
    },

    signup: async (req, res) => {
        const pw = req.body.Password;

        console.log("pw: " + pw);
        console.log("name: " + req.body.Name);
        const user = await Account.findOne(req.body.Email) 
        console.log(user);
        if (user) {
            throw (new Error("User Existed"));
        }

        bcrypt.hash(pw, saltRounds).then((hash) => {
            if (hash) {
                console.log(hash);
                let sql = `INSERT INTO account(Email, Password) VALUES (?, '${hash}')`

                db.query(sql, [req.body.Email], (errQuery, response) => {
                    if (errQuery) {
                        console.log("Co loi");
                        console.log(errQuery);
                        res.json(response);
                    }
                    else {
                        let subSql = `INSERT INTO user(Id, Name) values (?, ?)`;
                        db.query(subSql, [response.insertId, req.body.Name], (subErr, subRes) => {
                            if (subErr) {
                                console.log(subErr);
                                res.json(subRes);
                            } else {
                                console.log("Created account");
                            }
                        })
                        res.json(response);
                    }
                });
            }
        })

    },

    signin: function (req, res) {
        const pw = req.body.Password;
        const email = req.body.Email;
        try {
            Account.findAccountByCredentials(email, pw).then((user) => {
                console.log(`auth: ${user}`);
                if (!user) return res.status(401).send({ error: "Login failed! Check authentication credentials" });

                Account.generateAuthToken(user).then((token) => {
                    if (token)
                        res.status(201).send({ user, token });
                    else console.log("token failed")
                });
            });


        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = Auth;