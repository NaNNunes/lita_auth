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
    // console.log(date);
    const sql = `INSERT INTO DAYS(day_date) value(?)`;
    const value = [date];
    const conn = connection();
    conn.query(sql, value, callback);
    conn.end();
}

module.exports = {days, dayRegistration}