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
        } 
        else {
            console.log("Conectado com sucesso");
        }
    });

    return conn;
}

const memberRegister = async (data, callback) => {
    const sql = `INSERT INTO MEMBERS(
        member_enrollment, 
        member_name,
        member_surname,
        member_role
    ) 
        VALUES(?, ?, ?, ?)`;

    const values = [
        data.enrollment,
        data.name,
        data.surname,
        data.role
    ]
    const conn = connection();
    conn.query(sql, values, callback);
    conn.end();
}

const members = (callback) => {
    const sql = `SELECT * FROM MEMBERS`;
    const conn = connection();
    conn.query(sql, callback);
    conn.end();
}

const memberByEnrollment = async (enrollment, callback) => {
    const sql = `SELECT member_password, member_role FROM MEMBERS WHERE member_enrollment = ?`
    const value = [enrollment];
    const conn = connection();
    conn.query(sql, value, callback);
    conn.end();
}

const createLogin = (enrollment, password, callback) => {
    const sql = 
    `INSERT INTO MEMBER_SESSION(member_session_member_id, member_session_day_id, member_session_login_time)
	    SELECT m.member_id, d.day_id, current_time() FROM MEMBERS as m, DAYS as d 
        WHERE m.member_enrollment = ? AND m.member_password = ? AND d.day_date = current_date();`
        
    const values = [enrollment, password];
    const conn = connection();
    conn.query(sql, values, callback);
    conn.end();
}

// export const memberSearch = (callback) => {
//     const sql = `SELECT * FROM MEMBERS WHERE`;
//     conn.query(sql, callback);
//     conn.end();
// }

module.exports = {
    members, memberRegister, memberByEnrollment, createLogin
}