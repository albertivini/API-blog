const Usuario = require('../../../repositories/models/userModel')
const Profile = require('../../../repositories/models/profileModel')
const emailMiddleware = require('../Middlewares/confereEmail')
const validaMiddleware = require('../Middlewares/validaDados')

module.exports = {
    async cria (req, res) {
        try {
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password

            const valida = validaMiddleware.validaCadastro(username, email, password)

            if (valida) {
                
                const confereEmail = await emailMiddleware.confereEmail(email)

                const confereUsername = await Profile.buscaUsername(username) 

                if (confereEmail == false && confereUsername == undefined) {

                const cria = await Usuario.create(username, email, password)
                return res.status(201).json({ success: true })

                } else {

                    return res.status(401).json({ success: false, message: "E-mail ou Username inválido." })
                }

            } else {
                return res.status(422).json({success: false, message: "Algum campo está em desacordo ou está vazio."})
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ sucess: false, message: "Houve algum erro." })
        }
    }
}