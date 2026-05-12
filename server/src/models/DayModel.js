const mysql = require('mysql2');

const connection = () => {
    const conn = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "lita_auth_db",
    });
    conn.connect((erro) => {
        if (erro) {
            console.log(erro);
        } else {
            console.log("Conectado com sucesso");
        }
    });

    return conn;
}

const days = (callback) => {
    const sql = `SELECT * FROM DAYS`;
    const conn = connection();
    conn.query(sql, callback);
    conn.end();
}

const dayRegistration = (date = '', callback) => {
    const sql = `INSERT INTO DAYS(day_date) value(?)`;
    const conn = connection();
    conn.query(sql, [date], callback);
    conn.end();
}

module.exports = {days, dayRegistration}