const { members, memberRegister, memberByEnrollment, createLogin} = require( "../models/MemberModel.js");
const bcrypt = require("bcrypt");

const newMember = async (req = {body:{}}, res) => {
    const data = req.body;
    let hash = await bcrypt('1', 12);
    console.log(hash);
    memberRegister(data, (error) => {
        if(error) return res.status(500).json({erro: error.sqlMessage});
        return res.status(201).json({"result":"cadastro realizado"});
    })
}

const allMembers = (req, res) => {
    members((error, result) => {
        if(error) return res.status(500).json({erro: error.sqlMessage});
        return res.status(200).json(result);
    })
}

const login = async (req, res) => {
    
    const { enrollment, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 12);

    if (!enrollment) {
        return res.status(400).json({ msg: 'missing credentials' });
    }

    // Criar login
    createLogin(enrollment, password, (error, result) => {
        if(error) return res.status(500).json({msg: error.sqlMessage});
        return res.status(200).json({msg:"login efetivado"});
    });

};

const logout = async (req, res) => {
    const enrollment = req.body.enrollment;
    memberByEnrollment(enrollment, async(error, result = [{member_password: '', member_role: ''}]) => {
        if(error) return res.status(500).json({erro: error.sqlMessage});
        if(result.length == 0) return res.status(404).json({msg: 'not found'});
        
    })
}

module.exports = {
    allMembers, newMember, login
}