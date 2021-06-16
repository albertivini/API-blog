const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

function geraToken (id) {

    const privateKey = fs.readFileSync(path.resolve('src/services/keys/private.key'), 'utf8')
    const token = jwt.sign({id}, privateKey, {
        expiresIn: 3000,
        algorithm: 'RS256'
    })
    return token
}

module.exports = { geraToken }