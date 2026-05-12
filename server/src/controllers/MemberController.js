const { 
    editMember, memberAuth, members, memberByEnrollment, memberRegister 
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
    const {enrollment} = req.params;
    
    if (!enrollment) {
        return res.status(400).json({ msg: 'missing credentials' });
    }
    memberByEnrollment(enrollment, (error, result = []) => {
        if(error) res.status(500).json({msq: sqlMessage});
        if(result.length == 0) return res.status(404).json({msg: "not found"});
        return res.status(200).json({result: result[0]})
    })
}

const auth = (req, res) =>{
    const {enrollment, password} = req.body;

    if(!enrollment || !password) {
        return res.status(400).json({ msg: 'missing credentials' }).end();
    }

    memberAuth(enrollment, async (error, result) => {
        if(error) {
            return res.status(500).json({msg: error.sqlMessage}).end()
        }
        if(result.length == 0) {
            return res.status(404).json({msg: 'not found'}).end()
        }

        const { member_password } = result[0];
        const isSamePass = await bcrypt.compare(password, member_password);
        if(!isSamePass) {
            return res.status(401).json({msg: 'not autorized'}).end();
        }

        return res.status(200).json({msg: 'autorized'}).end();
    });
}


const newMember = async (req = {body:{}}, res) => {
    const { member_password } = req.body;
    const hashedPassword = await bcrypt.hash(member_password, 12);
    const data = {
        'enrollment':req.body.member_enrollment,
        'name': req.body.member_name,
        'surname': req.body.member_surname,
        'role': req.body.member_role,
        'password': await hashedPassword
    };
    
    memberRegister(data, (error) => {
        if(error){
            console.log(error);
            return res.status(500).json({erro: error.sqlMessage});  
        } 
        return res.status(201).json({"result":"cadastro realizado"});
    })
}

module.exports = {
    auth, allMembers, edit, member, newMember
}