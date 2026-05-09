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

const editMember = (data, callback) => {
    const sql = `UPDATE MEMBERS
        SET 
            member_name = ?,
            member_surname  = ?,
            member_enrollment = ?,
            member_role = ?,
            member_password = ?
        WHERE member_enrollment = ?`;

    const values = [
        data.member_name,
        data.member_surname,
        data.member_enrollment,
        data.member_role,
        data.member_password, 
        data.member_enrollment
    ]
    const conn = connection();
    conn.query(sql, values, callback);
    conn.end();
}

const memberRegister = async (data, callback) => {
    const sql = `INSERT INTO MEMBERS(
        member_enrollment, 
        member_name,
        member_surname,
        member_role,
        member_password
    ) 
        VALUES(?, ?, ?, ?, ?)`;

    const values = [
        data.enrollment,
        data.name,
        data.surname,
        data.role,
        data.password
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
    const sql = `
    SELECT 
        member_name, 
        member_surname, 
        member_role, 
        is_first_access
    FROM MEMBERS 
        WHERE member_enrollment = ?`
    const conn = connection();
    conn.query(sql, [enrollment], callback);
    conn.end();
}

const login = (enrollment, password, callback) => {
    const sql = 
    `INSERT INTO MEMBER_SESSION(member_session_member_id, member_session_day_id, member_session_login_time)
	    SELECT m.member_id, d.day_id, current_time() FROM MEMBERS as m, DAYS as d 
        WHERE m.member_enrollment = ? AND m.member_password = ? AND d.day_date = current_date();`
    const values = [enrollment, password];
    const conn = connection();
    conn.query(sql, values, callback);
    conn.end();
}

const logout = (enrollment, callback) => {
    const sql = `
        UPDATE MEMBER_SESSION AS s
            SET member_session_logout_time = current_time()
            WHERE s.member_session_member_id = (SELECT member_id FROM MEMBERS WHERE member_enrollment = ?)
                AND s.member_session_day_id = (SELECT day_id FROM DAYS WHERE day_date = current_date)`
}

// export const memberSearch = (callback) => {
//     const sql = `SELECT * FROM MEMBERS WHERE`;
//     conn.query(sql, callback);
//     conn.end();
// }

module.exports = {
   editMember, members, memberRegister, memberByEnrollment, login, logout
}