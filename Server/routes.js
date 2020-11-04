const { json } = require("body-parser");
var express = require("express");
let router = express.Router();
let account = require('../model/Account/Account');
const { post } = require("./server");


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

module.exports = function (app) {
    const board = require('../model/Board/Board');
    const auth = require('../model/Account/Auth')
    const account = require("../model/Account/Account");
    const authMiddleware = require('../middleware/auth')
    app.route('/boards')
        .all(authMiddleware)
        .get(board.get)
        .post(board.addBoard);

    app.route('/auth/signup').post(auth.signup);
    app.route("/auth/signin").post(auth.signin);
    app.route("/me").all(authMiddleware).get(account.getInfoById);
}