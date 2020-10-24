const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
var account = require('../model/Account/Account');
var board = require('../model/Board/Board');
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

router.get('/boards', (req, res) => {
    board.getAllBoard((err, rows) => {
        if (err) {
            console.log("Error");
            console.log(rows);
            res.json(rows);
        }
    })
})
module.exports = router;