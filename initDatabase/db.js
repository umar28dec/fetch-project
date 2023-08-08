const db = require('../config/connnection')
db.run(`CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title text, 
    completed INTEGER
    )`,
    (err) => {
        if (err) {
            console.log("Table alreday Created")
        }
    });
