const Usuario = require('../../../repositories/models/userModel')

module.exports = {
    async show (req, res, next) {
        try {
            const id = req.userId

            const token = req.headers.authorization.split(' ')[1]
    
            const dados = await Usuario.buscaUsuario(id)
    
            const response = {
                "user": {
                    "email": dados.email,
                    "token": token,
                    "username": dados.username,
                    "bio": dados.bio,
                    "image": dados.image
                }
            }
            return res.status(200).json(response)
        } catch (err) {
            return res.status(404).json({ message: "Usuário não existe."})
        }

    }
}