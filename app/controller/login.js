// const crypto = require('crypto')
// const User = require('../model/user')
const userRepository = require('../repository/user_repository')()


module.exports = function login(req,res) {
  const user_id = req.body.user_id
  const password = req.body.password
  

  const user = userRepository.find(user_id, (user) => {
    if (user && user.checkpassword(password)){
      req.session.user = user
      console.log(1,user)
      res.redirect('/')
    } else {
      res.render("login.ejs",{err:'入力情報が間違っています。'});
    }
  })
}