const Article = require('../../../repositories/models/articleModel')
const User = require('../../../repositories/models/userModel')

module.exports = {
    async show (req, res, next) {
        try {
            const slug = req.params.slug

            const busca = await Article.buscaBySlug(slug)
    
            if (busca != false) {

                const autor = await User.buscaUsuario(busca.idUser)

                const novotaglist = JSON.parse(busca.taglist)

                const response = {
                    "article": {
                        "slug": busca.slug,
                        "title": busca.title,
                        "description": busca.description,
                        "body": busca.body,
                        "tagList": novotaglist,
                        "createdAt": busca.createdAt,
                        "updatedAt": busca.updatedAt,
                        "author": {
                            "username": autor.username,
                            "bio": autor.bio,
                            "image": autor.image
                        }
                    }
                }
                return res.status(200).json(response)

            } else {
                return res.status(404).json({ success: false, message: "Publicação não encontrada" })
            }
        } catch {
            return res.status(500).json({ success: false, message: "Houve algum erro"})
        }

    }
}