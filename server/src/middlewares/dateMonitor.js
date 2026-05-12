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


const newDay = (date) => {
    const sql = `INSERT INTO DAYS(day_date) value(?)`;
    const conn = connection();
    conn.query(sql, [date], (error, result)=>{
        if(error) {
            console.log(error)
            return
        }
        console.log("Novo dia registrado");
    });
    conn.end();
}


exports.module = {newDay};
