const { days, dayRegistration } = require("../models/DayModel.js");

// lista de dias, verificar ultimo dia da lista e verificar datas, caso diferentes registrar no banco
const allDays = (_, res) => {
    days((error, result = [])=>{
        if(error) return res.status(500).json({erro:error.sqlMessage});
        if(result.length < 1) return res.status(404).json({result:'not_found'});
        return res.status(200).json(result);
    })
}

const lastDay = (_, res) => {
    days((error, result = [])=>{
        if(error) return res.status(500).json({erro:error.sqlMessage});
        if(result.length < 1) return res.status(404).json({result:'not_found'});
        return res.status(200).json(result[result.length-1]);
    })
}

const newDay = (req, res) => {
    dayRegistration(
        req.body.date, 
        (error) => {
            if(error) res.status(500).json({erro: error.sqlMessage});
            res.status(201).json({"result":"data cadastrada"});
    });
}

module.exports = {
    allDays, newDay, lastDay
};