const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
var account = require('../model/Account/Account');

router.get('/', (req, res, next) => {
    account.getAllAccount((err, rows) => {
        if (err) {
            console.log("not found");
            console.log(err);
          res.json(err);
        } else {
            console.log("found");
            console.log(rows);
            res.json(rows);
        }
    })
})
module.exports = router;