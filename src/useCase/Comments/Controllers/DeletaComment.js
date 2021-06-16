const Comment = require('../../../repositories/models/commentModel')
const Article = require('../../../repositories/models/articleModel')

module.exports = {
    async deleta (req, res, next) {
        try {
            const idUser = req.userId 
            const idComment = req.params.id
            const slug = req.params.slug
    
            const artigo = await Article.buscaBySlug(slug)
    
            const deleta = await Comment.deletaComment(artigo.id, idUser, idComment)
    
            return res.status(200).json({ success: true, message: "Comentário Deletado."})
        } catch (err) {
            return res.status(404).json({ success: false, message: "Não foi possível deletar o comentário."})
        } 

    }
}