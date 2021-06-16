const Article = require('../../../repositories/models/articleModel')
const User = require('../../../repositories/models/userModel')
const Favorite = require('../../../repositories/models/favoriteModel')
const slugMiddleware = require('../Middlewares/slugTitle')

async function atualizaPostagemSemTitle (novosDados, slug, id) {

    await Article.atualizaPostagemSemSlug(novosDados, slug, id)
        
    const novaBusca = await Article.buscaBySlugAndId(slug, id)
    const buscaUser = await User.buscaUsuario(id)
    const novotaglist = JSON.parse(novaBusca.taglist)
    const contaFavoritos = await Favorite.contaFavoritos(novaBusca.id)

    const response = {
        "article": {
            "slug": slug,
            "title": novaBusca.title,
            "description": novaBusca.description,
            "body": novaBusca.body,
            "tagList": novotaglist,
            "createdAt": novaBusca.createdAt,
            "updatedAt": novaBusca.updatedAt,
            "favoritesCount": contaFavoritos,
            "author": {
                "username": buscaUser.username,
                "bio": buscaUser.bio,
                "image": buscaUser.image,
            }
        }
    }
    return response
}

async function atualizaPostagemComTitle (novosDados, slug, id) {

    const novoSlug = slugMiddleware.slugTitle(novosDados.title)
    
    await Article.atualizaPostagem(novosDados, novoSlug, slug, id)

    const novaBusca = await Article.buscaBySlugAndId(novoSlug, id)
    const buscaUser = await User.buscaUsuario(id)
    const novotaglist = JSON.parse(novaBusca.taglist)
    const contaFavoritos = await Favorite.contaFavoritos(novaBusca.id)

    const response = {
        "article": {
            "slug": novoSlug,
            "title": novaBusca.title,
            "description": novaBusca.description,
            "body": novaBusca.body,
            "tagList": novotaglist,
            "createdAt": novaBusca.createdAt,
            "updatedAt": novaBusca.updatedAt,
            "favoritesCount": contaFavoritos,
            "author": {
                "username": buscaUser.username,
                "bio": buscaUser.bio,
                "image": buscaUser.image,
            }
        }
    }  
    return response
}

module.exports = { atualizaPostagemSemTitle, atualizaPostagemComTitle }