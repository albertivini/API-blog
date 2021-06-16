const Article = require('../../../repositories/models/articleModel')
const Favorite = require('../../../repositories/models/favoriteModel')
const User = require('../../../repositories/models/userModel')
const Profile = require('../../../repositories/models/profileModel')

module.exports = {
    async desfavorita (req, res, next) {
        try {
            const slug = req.params.slug
            const id = req.userId
    
            const artigo = await Article.buscaBySlug(slug)

            if (artigo != false) {
                    
                const confere = await Favorite.confereFavorite(artigo.id, id)
        
                if (confere) {
        
                    await Favorite.desfavoritaArtigo(artigo.id, id)
        
                    const contagem = await Favorite.contaFavoritos(artigo.id)
                    
                    const autor = await User.buscaUsuario(artigo.idUser)
        
                    const follow = await Profile.confereFollow(id, artigo.idUser)
        
                    const response = {
                        "article": {
                            "slug": artigo.slug,
                            "title": artigo.title,
                            "description": artigo.description,
                            "body": artigo.body,
                            "tagList": JSON.parse(artigo.taglist),
                            "createdAt": artigo.createdAt,
                            "updatedAt": artigo.updatedAt,
                            "favorited": false,
                            "favoritesCount": contagem,
                            "author": {
                                "username": autor.username,
                                "bio": autor.bio,
                                "image": autor.image,
                                "following": follow
                            }
                        }
                    }
                    return res.status(200).json(response)
                } else {
                    return res.status(401).json({ success: false, message: "Postagem não está favoritada."})
                }
            } else {
                return res.status(404).json({ success: false, message: "Postagem não encontrada."})
            }
    
        } catch (err) {
            return res.status(500).json({ success: false, message: "Não foi possível desfavoritar a postagem."})
        }
    }
}