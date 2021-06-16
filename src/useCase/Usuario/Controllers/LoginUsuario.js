const emailMiddleware = require('../Middlewares/confereEmail')
const tokenMiddleware = require('../Middlewares/geraToken')
const validaMiddleware = require('../Middlewares/validaDados')

module.exports = {
    async login(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password

            const validaDados = validaMiddleware.validaLogin(email, password)

            if (validaDados) {

                const confere = await emailMiddleware.confereEmail(email)
                
                if(confere == false) {
                    return res.status(404).json({ success: false, message:"Usuário não cadastrado."})

                } else {
                    if (email == confere.email && password == confere.password) {
    
                        const id = confere.id
                        const token = tokenMiddleware.geraToken(id)
    
                        return res.status(202).json({ auth: true, token: token})
                    } else {
                        return res.status(401).json({ message: "Email ou Senha inválido."})
                    }
                }
            } else {
                return res.status(401).json({ message: "Email ou Senha inválido."})
            }
        } catch (err) {
            return res.status(500).json({ success: false, message: "Houve algum erro." })
        }
    }
}