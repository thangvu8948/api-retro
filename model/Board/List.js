const { response } = require('express');
const db = require('../DbConnection');

const List = {
    get: (req, res) => {
        const boardId = req.params.BoardId;
        let sql = 'Select * from board_info';
        db.query(sql, (err, response) => {
            if (err) throw err;
            res.json(response);
        });
    },

    addBoard: (req, res) => {
        let data = req.body.name;
        console.log(req.body);
        let sql =`INSERT INTO board_info(Name) values ("${data}")`;
        db.query(sql, (err, response) => {
            if (err) throw err;
            res.json(response);
        });
    }
}

module.exports = List;