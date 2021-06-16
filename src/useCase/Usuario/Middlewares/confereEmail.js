const Usuario = require('../../../repositories/models/userModel')

async function confereEmail (email) {
    try {
        const valida = await Usuario.buscaUserByEmail(email)

        return valida

    } catch (err) {
        console.log(err)
    }

}

module.exports = { confereEmail }