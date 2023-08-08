const db = require('../config/connnection')
const storeTodos = async (data) => {
    try {
        const insert = 'INSERT INTO todo (id, userId, title, completed) VALUES (?,?,?, ?)'
        return db.run(insert, data)
    } catch (error) {
        console.log(error);

    }
}

const getLastRecordId = async () => {
    try {
        const sql = "SELECT * FROM todo ORDER BY id DESC LIMIT 1";
        return new Promise((resolve, reject) => {
            db.get(sql, [], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllTodos = async () => {
    try {
        const sql = "select * from todo";
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { storeTodos, getLastRecordId, getAllTodos }
