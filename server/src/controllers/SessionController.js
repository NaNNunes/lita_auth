const bcrypt = require("bcrypt");
const {logout, login, session} = require("../models/SessionModel.js");

const memberSession = (req, res) => {
    const {member_enrolment} = req.params;
    if(!member_enrolment){
        return res.status(400).json({msg:'missing credentials'});
    }

    session(member_enrolment, (error, result = []) => {
        if(error) {
            console.log(error);
            return res.status(500).json({msg: error.sqlMessage});
        }
        if(result.length == 0) return res.status(404).json({msg: 'not found'});
        return res.status(200).json({result: result[0]});
    })
}

const newSession = (req, res) => {
    const { enrollment } = req.body;

    if (!enrollment) {
        return res.status(400).json({ msg: 'missing credentials' });
    }

    login(enrollment, (error, result) => {
        if(error) {
            console.log(error);
            return res.status(500).json({msg: error.sqlMessage})
        }

        if(result.affectedRows == 0) {
            return res.status(400).json({msg:"not found"});
        }
        return res.status(201).json({msg:"login efetivado"});
    });
};

// testar logica
const sessionLogout = (req, res) => {
    const {enrollment} = req.body;
    if (!enrollment) {
        return res.status(400).json({ msg: 'missing credentials' });
    }
    logout(enrollment, (error, result) => {
        if(error) {
            console.log(error); 
            return res.status(500).json({erro: error.sqlMessage});
        }
        if(result.affectedRows == 0) {
            return res.status(400).json({msg:"not found"});
        }
        return res.status(200).json({msg:"logout realizado"})
    })
}

module.exports = {
    newSession, memberSession, sessionLogout
}