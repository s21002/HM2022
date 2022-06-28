const crypto = require('crypto')

module.exports = class User {
  constructor(login_id, password, name) {
    this.login_id = login_id
    this.password = password
    this.name = name
  }

  checkpassword(password) {
    const hashedpass = crypto.createHash('sha256').update(password).digest('hex')
    return this.password === hashedpass
  }
}