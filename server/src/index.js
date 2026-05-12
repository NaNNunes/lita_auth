const express = require("express");
const cors = require('cors');

const dotenv = require('dotenv');
const app = express();

const DateMiddleware = require("./middlewares/dateMonitor.js");
const member = require("./routes/MemberRouter.js");
const day = require("./routes/DayRouter.js");
const session = require("./routes/SessionRouter.js"); 

dotenv.config();
const PORT = process.env.PORT;
if(!PORT){
    console.log('porta não encontrada');
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: `http://localhost:5173`}));

app.use("/", member);
app.use("/", day);
app.use("/", session);


let lastDate = new Date().toISOString().split('T')[0];
setInterval(()=>{
    const now = new Date().toISOString().split('T')[0];
    if(now != lastDate){
        lastDate = now;
        DateMiddleware.module.newDay(now)
    }
}, 5000);

app.listen(PORT, () => {
    console.log("Server started in port " + PORT)
});