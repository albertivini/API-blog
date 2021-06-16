const Comment = require('../../../repositories/models/commentModel')
const User = require('../../../repositories/models/userModel')

async function pegaResponseComments (idPost) {

    const busca = await Comment.buscaComments(idPost)

    return Promise.all(busca.map(async comentario => {

        const usuario = await User.buscaUsuario(comentario.idUser)

        return {
            "id": comentario.id,
            "body": comentario.body,
            "createdAt": comentario.createdAt,
            "updatedAt": comentario.updatedAt,
            "author": {
                "username": usuario.username,
                "bio": usuario.bio,
                "image": usuario.image,
                } 
            }
        }))
}

module.exports = { pegaResponseComments }
