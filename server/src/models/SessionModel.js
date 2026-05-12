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
const session = (enrollment, callback) => {
    const sql = `
    SELECT 
        d.day_date
    FROM 
        MEMBER_SESSION AS s 
    LEFT JOIN 
        MEMBERS AS m 
            ON m.member_id = s.member_session_member_id
    RIGHT JOIN
        DAYS AS d
            ON d.day_id = s.member_session_day_id
    WHERE 
        m.member_enrollment = ? AND d.day_date = current_date()`;
    const conn = connection();
    conn.query(sql, [enrollment], callback);
    conn.end();
}
const login = (enrollment, callback) => {
    const sql = `
    INSERT INTO MEMBER_SESSION(
            member_session_member_id, 
            member_session_day_id, 
            member_session_login_time)
    SELECT 
        m.member_id,
        d.day_id, 
        current_time() 
    FROM 
        MEMBERS as m,
        DAYS as d 
    WHERE 
        m.member_enrollment = ? AND d.day_date = current_date()`;
    const conn = connection();
    conn.query(sql, [enrollment], callback);
    conn.end();
}
const logout = (enrollment, callback) => {
    const sql = `
    UPDATE MEMBER_SESSION AS s
    SET 
        member_session_logout_time = current_time()
    WHERE 
        s.member_session_member_id = (
            SELECT 
                member_id 
            FROM 
                MEMBERS 
            WHERE 
                member_enrollment = ?)
        AND 
        s.member_session_day_id = (
            SELECT 
                day_id 
            FROM 
                DAYS 
            WHERE 
                day_date = current_date())`;
    const conn = connection();
    conn.query(sql, [enrollment], callback);
    conn.end();
}

module.exports = {login, logout, session}



