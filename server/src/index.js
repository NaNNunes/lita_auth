const express = require("express");
const cors = require('cors');

const dotenv = require('dotenv');
const app = express();

const dateMonitor = require("./middlewares/dateMonitor.js");
const memberRouter = require("./routes/memberRouter.js");
const dayRouter = require("./routes/dayRouter.js");

dotenv.config();
const PORT = process.env.PORT;
if(!PORT){
    console.log('porta não encontrada');
    psrocess.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: `http://localhost:5173`}))
app.use("/", memberRouter)
app.use("/", dayRouter)

app.listen(PORT, () => {
    setInterval(dateMonitor, 5000);
    console.log("Server started in port " + PORT)
});