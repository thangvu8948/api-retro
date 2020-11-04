const { response } = require('express');
const db = require('../DbConnection');

const Board = {
    get: (req, res) => {
        let sql = 'Select board_info.* from board_info join board_user on board_info.BoardId = board_user.BoardId where board_user.UserId = ? ';
        db.query(sql, req.user.Id,(err, response) => {
            if (err) throw err;
            res.json(response);
        });
    },

    addBoard: (req, res) => {
        let data = req.body.name;
        console.log(req.body);
        console.log(req.user.Id)
        let sql =`INSERT INTO board_info(Name) values ("${data}")`;
        db.query(sql, (err, response) => {
            if (err) throw err;
            let subQuery = `INSERT INTO board_user values (?, ?)`;
            db.query(subQuery, [req.user.Id, response.insertId], (subErr, subRes) => {
                if (subErr) throw subErr;
                let subQuery2 = `INSERT INTO list(info) values (?, ?)`;
            } )
            res.json(response);
        });
    }


}



module.exports = Board;