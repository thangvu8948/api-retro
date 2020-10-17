var express = require("express");
var router = express.Router();
var account = require('../model/Account/Account');

router.get('/', (req, res, next) => {
    account.getAllAccount((err, rows) => {
        if (err) {
            res.send(res.json(err));
        } else {
            res.send(res.json(rows));
        }
    })
    res.send("Hello World");
})
module.exports = router;