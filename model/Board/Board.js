const { response } = require('express');
const db = require('../DbConnection');

const addListToBoard = (boardId, name) => {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO list_info(ListName) values (?)`;
        db.query(query, name, (err, res) => {
            if (err) reject(err);
            console.log(res);
            let subQuery = `INSERT INTO board_list values (?, ?)`;
            db.query(subQuery, [boardId, res.insertId], (subErr, subRes) => {
                if (subErr) reject(subErr);
                console.log(name)
                resolve(res);
            });
        }) 
    })
   
}

const Board = {
    get: (req, res) => {
        let sql = 'Select board_info.* from board_info join board_user on board_info.BoardId = board_user.BoardId where board_user.UserId = ?  and board_info.isDelete = 0';
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
                addListToBoard(response.insertId, "Went Well");
                addListToBoard(response.insertId, "To Improve");
                addListToBoard(response.insertId, "Action Items");
                res.json(response);
            } )
           
        });
    },

    getList: (req, res) => {
        const userId = req.user.Id;
        console.log(userId + " " + req.params.id)
        let sql0 = `select * from board_user join board_info on board_user.BoardId = board_info.BoardId where board_user.BoardId = ? and board_user.UserId = ? and board_info.isDelete = 0`;
        db.query(sql0, [req.params.id, userId], (err0, response0) => {
            if (err0) {
                console.log(err);
                res.status(403).json({isSuccess: false})
            } else {
                if (response0.length == 0) {
                    res.status(403).json({isSuccess: false})
                    return;
                }
                let sql = `select * from board_list join list_info on board_list.ListId = list_info.ListId join board_info on board_list.BoardId = board_info.BoardId where board_list.BoardId= ?`;
                db.query(sql, req.params.id, (err, response) => {
                    if (err)throw err;
                    response.isSuccess = true;
                    res.json(response).status(200);
                })
            }
        } )
        
    },

    getItem: (req, res) => {
        const userId = req.user.Id;
        console.log(req.params.listId);
        let sql = `select * from item_content join list_item on item_content.ItemId = list_item.ItemId where list_item.ListId = ? and item_content.isDelete = 0`;
        db.query(sql, req.params.listId, (err, response) => {
            if (err) throw err;
            res.json(response);
        });
    },

    addItem: (req, res) => {
        const userId = req.user.Id;
        const listId = req.params.listId;
        const value = req.body.content;
        let sql = `INSERT INTO item_content(content) values (?)`;
        db.query(sql, value, (err, response) => {
            if (err)throw err;
            let subSql = `INSERT INTO list_item values (?, ?)`;
            db.query(subSql, [listId, response.insertId], (subErr, subRes) => {
                if (subErr) throw subErr;
                res.json(response);
            })
        })
    },

    removeBoard: (req, res) => {
        const userId = req.user.Id;
        const boardId = req.body.id;
        console.log(boardId);
        let sql = `update board_info set board_info.isDelete = 1 where board_info.BoardId = ?`;
        db.query(sql, boardId, (err, response) => {
            if (err) throw err;
            res.json(response);
        })
    },

    removeItem: (req, res) => {
        const userId = req.user.Id;
        const itemId = req.body.itemId;
        let sql = `update item_content set item_content.isDelete = 1 where item_content.ItemId = ?`;
        db.query(sql, itemId, (err, response) => {
            if (err) throw err;
            res.json(response);
        })
    },

    updateItem: (req, res) => {
        const userId = req.user.Id;
        const itemId = req.user.itemId;
        let sql = `update item_content set item_content.Content = ? where item_content.ItemId = ?`;
        db.query(sql, [req.body.content, req.body.itemId], (err, response) =>{
            if (err) throw err;
            res.json(response);
        })
    },

    renameBoard: (req, res) => {
        console.log("rename board");
        const boardId = req.body.boardId;
        const newName = req.body.Name;
        let sql = `update board_info set board_info.Name = ? where board_info.BoardId = ?`;
        db.query(sql, [newName, boardId], (err, response) => {
            if (err) throw err;
            res.json(response);
        })
    }
}



module.exports = Board;