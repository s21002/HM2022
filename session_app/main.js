const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs')


app.get("/",(req,res) => {
  res.redirect("/login");
});

app.use("/",require("./login.js"));

app.listen(3000);
console.log("server started");