const mysql = require('mysql')
const User = require('../model/user')


module.exports = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'mydb'
  })


  return {
    find: (user_id, fn) => {
      connection.connect()
      connection.query(
        'SELECT user_id, password, name FROM user WHERE user_id = ?',[user_id], (err, results) => {
          if (err) throw err
          
          if(results.length === 1) {
            fn(new User(results[0].user_id, results[0].password, results[0].name))
          } else {
            fu(null)
          }
        }
      )
      connection.end()
      console.log('end db')
    }
  }
}