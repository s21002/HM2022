const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const crypto = require('crypto')

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'mydb'
});

// DB接続
connection.connect((err) => {
  if (err)throw err;
  console.log("DB.Connected!!");
});

app.set('view engine', 'ejs')

let i = 0;


app.post("/login", (req, res) => {
  let Id = req.body.username;　　//入力ID
  let Pass = req.body.password;　//入力PASS
  
  if(Id === "" || Pass === ""){
    return res.render("./login.ejs",{err:'入力してください。'});
  }
  
  Pass = crypto.createHash('sha256').update(req.body.password).digest('hex');
  console.log(Id,Pass);
  
  
  // DB読み込み
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      throw err
      };
      for(i; i< results.length; i++){
        // 認証処理
        if (Id === results[i].user_id){
          if(Pass === results[i].password){
            console.log('Good!!');
            return res.render("./next",{name:results[i].name});
          }else{
            console.log('pass,err');
            return res.render("./login",{err:'入力情報が間違っています。'});
          }
        }
      }
      console.log('name,err');
      return res.render("./login",{err:'入力情報が間違っています。'});
    });
  }
);
      


app.get("/",(req,res) => {
  res.redirect("/login");
});

app.get("/login",(req,res) => {
  res.render("./login",{err:""});
});

module.exports = app;