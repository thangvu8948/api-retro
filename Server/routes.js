var express = require("express");
var router = express.Router();
var film = require('../model/Film');

router.get('/', (req, res, next) => {
    film.getAllFilm((err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    })
    res.send("Hello World");
})
module.exports = router;