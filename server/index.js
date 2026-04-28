const express = require("express");
const dotenv = require('dotenv');
const {engine} = require("express-handlebars")

dotenv.config();
const PORT = process.env.PORT;
if(!PORT){
    console.log('porta não encontrada');
    process.exit(1);
}

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", ()=>{
    res.send("Hello world");
})

app.listen(PORT, () => {
    // setInterval(dateMonitor, 5000);
    console.log("Server started in port " + PORT)
});