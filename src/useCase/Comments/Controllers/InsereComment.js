const Comment = require('../../../repositories/models/commentModel')
const Article = require('../../../repositories/models/articleModel')
const User = require('../../../repositories/models/userModel')

module.exports = {
    async insere (req, res, next) {
        try {
            const id = req.userId 
            const body = req.body.body
            const slug = req.params.slug
    
            const artigo = await Article.buscaBySlug(slug)
            const user = await User.buscaUsuario(id)
    
            const insere = await Comment.insereComment(body, artigo.id, id)
            
            const response = {
                "comment": {
                    "id": insere.id,
                    "createdAt": insere.createdAt,
                    "updatedAt": insere.updatedAt,
                    "body": insere.body,
                    "author": {
                        "username": user.username,
                        "bio": user.bio,
                        "image": user.image
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (err) {
            return res.status(404).json({ success: false, message: "Não foi possível comentar."})
        }
    }
}