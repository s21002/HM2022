const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use("/",require("./controller/login.js"));

app.listen(3000);
console.log("server start");