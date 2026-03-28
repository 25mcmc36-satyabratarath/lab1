const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "task15_db",
});

db.connect((err) => {
    if (err) {
        console.log("DB Connection Failed");
        return;
    }
    console.log("DB Connected");
});

module.exports = db;