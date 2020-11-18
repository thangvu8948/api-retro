const { json } = require("body-parser");
var express = require("express");
const Account = require("../model/Account/Account");
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
    app.route("/boards/:id").all(authMiddleware).get(board.getList);
    app.route("/boards/delete").all(authMiddleware).post(board.removeBoard);
    app.route("/boards/rename").all(authMiddleware).post(board.renameBoard);
    app.route("/items/update").all(authMiddleware).post(board.updateItem)
    app.route("/items/delete").all(authMiddleware).post(board.removeItem);
    app.route("/boards/:id/:listId").all(authMiddleware).get(board.getItem).post(board.addItem);
    app.route("/account").all(authMiddleware).get(Account.getInfo).post(Account.updateInfo);
}