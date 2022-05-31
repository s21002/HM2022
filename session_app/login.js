const express = require('express');
const app = express();
const crypto = require('crypto')
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'mydb'
});
const session = require('express-session');
const DynamoDBStore = require('connect-dynamodb')(session)
const DynamoDBStoreOptions = {
  table: "db-session",
  AWSConfigJSON: {
    region: 'us-east-1',
    correctClockSkew: true,
    httpOption: {
      secureProtocol: 'TLSv1_method',
      ciphers: "ALL"
    },
  },
}
app.use(session({
  store: new DynamoDBStore(DynamoDBStoreOptions),
  name: 'session-name',
  secret: 'session-secret-key',
  resave: false,
  saveUninitialized: false
}));




// DB接続
connection.connect((err) => {
  if (err)throw err;
  console.log("DB.Connected!!");
});


app.get('/login',(req,res) => {
  if(req.session.username){
    res.render("./next",{name:req.session.username});
  }else{
    res.render("./login",{err:""});
  }
});



let i = 0;
app.post("/login", (req, res) => {
  let Id = req.body.username;　　//入力ID
  let Pass = req.body.password;　//入力PASS
  
  if(Id === "" || Pass === ""){
    return res.render("./login.ejs",{err:'入力してください。'});
  }
  Pass = crypto.createHash('sha256').update(req.body.password).digest('hex');
  console.log(Id,Pass);


//DB読み込み＆認証
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      throw err
      };
      for(i; i< results.length; i++){
        if (Id === results[i].user_id){
          if(Pass === results[i].password){
            console.log('Good!!');
            req.session.username = results[i].name;
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
    connection.end;
  }
);
      

module.exports = app;