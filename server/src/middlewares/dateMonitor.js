const dotenv = require('dotenv');
dotenv.config();
const URL = process.env.LOCAL_API;
const PORT = process.env.PORT;

let lastDate = null;

// registra data no banco
const registration = async (date = '') => {
    const options = {
        "method" : "POST",
        "headers" : {"Content-Type" : "application/json"},
        "body": JSON.stringify({date: date})
    }
    const res = await fetch(`${URL}:${PORT}/days/new`, options);
    if(!res.ok) throw new Error(await res.json());
}

const dateMonitor = async () => {   
    const date = new Date();
    let currentDateString = date.toISOString().split('T')[0];
    const res = await fetch(`${URL}:${PORT}/days/last`);

    if(!res.ok && res.status != 404) return
    if(res.status == 404){
        registration(currentDateString);
        lastDate = currentDateString
        return
    }

    const data = await res.json();
    lastDate = date.toISOString(data.day_date).split("T")[0];
    if(currentDateString != lastDate){
        registration(currentDateString);
        return
    }    

}

module.exports = dateMonitor;