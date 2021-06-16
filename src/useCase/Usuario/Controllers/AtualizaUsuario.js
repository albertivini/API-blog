const Usuario = require('../../../repositories/models/userModel')

module.exports = {
    async atualiza (req, res, next) {
        try {
            const id = req.userId
            const token = req.headers.authorization.split(' ')[1]

            const novosDados = req.body

            await Usuario.atualizaUsuario(novosDados, id)

            const dadosFinais = await Usuario.buscaUsuario(id)

            const response = {
                "user": {
                    "email": dadosFinais.email,
                    "token": token,
                    "username": dadosFinais.username,
                    "bio": dadosFinais.bio,
                    "image": dadosFinais.image
                }
            }

            return res.status(202).json(response)
    
        } catch (err) {
            return res.status(500).json({ message: "Algum erro ocorreu."})
        }


    }

}