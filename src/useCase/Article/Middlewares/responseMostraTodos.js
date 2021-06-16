const Article = require('../../../repositories/models/articleModel')
const User = require('../../../repositories/models/userModel')
const Favorite = require('../../../repositories/models/favoriteModel')

async function pegaResponse () {
    
    const busca = await Article.buscaTodasPostagens()
    
    return Promise.all(busca.map(async artigo => {
        const usuario = await User.buscaUsuario(artigo.idUser)
        const contaFavoritos = await Favorite.contaFavoritos(artigo.id)
        return {
            "slug": artigo.slug,
            "title": artigo.title,
            "description": artigo.description,
            "body": artigo.body,
            "tagList": JSON.parse(artigo.taglist),
            "createdAt": artigo.createdAt,
            "updatedAt": artigo.updatedAt,
            "favoritesCount": contaFavoritos,
            "author": {
                "username": usuario.username,
                "bio": usuario.bio,
                "image": usuario.image
                } 
            }
        }))
}

module.exports = { pegaResponse }
