const validator = require('validator')

function validaLogin (email, password) {
    if (validator.isEmail(email) && !(validator.isEmpty(password))) {
        return true
    } else {
        return false
    }
}

function validaCadastro (username, email, password) {
    if (validator.isAlphanumeric(username) && validator.isEmail(email) && !(validator.isEmpty(password))) {
        return true
    } else {
        return false
    }
}


module.exports = { validaCadastro, validaLogin }