const { 
    editMember, members, memberByEnrollment, memberRegister, login, logout 
} = require( "../models/MemberModel.js");
const bcrypt = require("bcrypt");

const allMembers = (req, res) => {
    members((error, result) => {
        if(error) return res.status(500).json({erro: error.sqlMessage});
        return res.status(200).json(result);
    })
}

const edit = async (req, res) => {
    const enrollment = req.params.enrollment;
    
    if (!enrollment) {
        return res.status(400).json({ msg: 'missing credentials' });
    }

    for (const [key, value] of Object.entries(req.body)){
        if(!value) {
            return res.status(400).json({ msg: `${key} is empty`});
        }
    }

    const hashedPassword = await bcrypt.hash(req.body.member_password, 12);
    const data = {
        member_name: req.body.member_name,
        member_surname: req.body.member_surname,
        member_enrollment: req.body.member_enrollment,
        member_role: req.body.member_role,
        member_password: hashedPassword
    }

    editMember(data, (error) => {
        if(error) res.status(500).json({msq: error.sqlMessage});
        return res.status(201).json({msg: "member edited"})
    });
}

const member = (req, res) => {
    const enrollment = req.params.enrollment;
    
    if (!enrollment) {
        return res.status(400).json({ msg: 'missing credentials' });
    }

    memberByEnrollment(enrollment, (error, result = []) => {
        if(error) res.status(500).json({msq: sqlMessage});
        if(result.length == 0) res.status(404).json({msg: "not found"});
        return res.status(200).json({result: result[0]})
    })
}

const memberLogin = async (req, res) => {
    const { enrollment, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 12);

    if (!enrollment) {
        return res.status(400).json({ msg: 'missing credentials' });
    }

    login(enrollment, hashedPass, (error, result) => {
        if(error) return res.status(500).json({msg: error.sqlMessage});
        return res.status(201).json({msg:"login efetivado"});
    });

};

const memberLogout = async (req, res) => {
    const enrollment = req.body.enrollment;

    if (!enrollment) {
        return res.status(400).json({ msg: 'missing credentials' });
    }

    logout(enrollment, async(error, result = [{member_password: '', member_role: ''}]) => {
        if(error) return res.status(500).json({erro: error.sqlMessage});
        return res.status(200).json({msg:"logout realizado"})
    })
}

const newMember = async (req = {body:{}}, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    const data = {
        'enrollment':req.body.enrollment,
        'name': req.body.name,
        'surname': req.body.surname,
        'role': req.body.role,
        'password': await hashedPassword
    };
    
    memberRegister(data, (error) => {
        if(error) return res.status(500).json({erro: error.sqlMessage});
        return res.status(201).json({"result":"cadastro realizado"});
    })
}

module.exports = {
    allMembers, edit, member, newMember, memberLogin, memberLogout
}