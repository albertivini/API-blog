const Article = require('../../../repositories/models/articleModel')
const Favorite = require('../../../repositories/models/favoriteModel')
const Profile = require('../../../repositories/models/profileModel')

async function pegaResponseFeed (id) {

    const busca = await Article.rawQuerieBuscaTodos(id)
    
    return Promise.all(busca.map(async artigo => {

        const contaFavoritos = await Favorite.contaFavoritos(artigo.id)
        const confereFollow = await Profile.confereFollow(id, artigo["follow.user.id"])
        const confereFavorito = await Favorite.confereFavorite(artigo.id, id)

        return {
            "slug": artigo.slug,
            "title": artigo.title,
            "description": artigo.description,
            "body": artigo.body,
            "tagList": JSON.parse(artigo.taglist),
            "createdAt": artigo.createdAt,
            "updatedAt": artigo.updatedAt,
            "favorited": confereFavorito,
            "favoritesCount": contaFavoritos,
            "author": {
                "username": artigo["follow.user.username"],
                "bio": artigo["follow.user.bio"],
                "image": artigo["follow.user.image"],
                "following": confereFollow
                } 
            }
        }))
}

module.exports = { pegaResponseFeed }
