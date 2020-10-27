const { json } = require("body-parser");
var express = require("express");
let router = express.Router();
let account = require('../model/Account/Account');


// router.get('/', (req, res, next) => {
//     account.getAllAccount((err, rows) => {
//         if (err) {
//             console.log("not found");
//             console.log(err);
//           res.json(err);
//         } else {
//             console.log("found");   
//             console.log(rows);
//             res.json(rows);
//         }
//     })
// })

// router.get('/boards', (req, res) => {
//     board.getAllBoard((err, rows) => {
//         if (err) {
//             console.log("Error");
//             console.log(rows);
//             res.json(rows);
//         } else {
//             console.log("Error");
//             console.log(rows);
//             res.json(rows);
//         }
//     })
// })

//module.exports = router;

module.exports = function(app) {
    let board = require('../model/Board/Board');

    app.route('/boards')
    .get(board.get)
    .post(board.addBoard);
}