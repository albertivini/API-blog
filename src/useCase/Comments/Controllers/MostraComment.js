const Comment = require('../../../repositories/models/commentModel')
const Article = require('../../../repositories/models/articleModel')
const ResponseMiddleware = require('../Middlewares/responseMostraComents')

module.exports = {
    async mostra (req, res, next) {
        try {
            const slug = req.params.slug

            const busca = await Article.buscaBySlug(slug)
            const buscaComments = await Comment.buscaComments(busca.id)

            if (busca == false) {
                return res.status(404).json({ success: false, message: "Publicação não encontrada."})
            } else {
                if (buscaComments == false) {
                    return res.status(404).json({ success: false, message: "Publicação não tem comentários."})
                } else {
                    ResponseMiddleware.pegaResponseComments(busca.id).then(comments => {
                    return res.status(200).json({comments})})
                }
            }
        } catch (err) {
            return res.status(500).json({success: false, message: "Houve algum erro."})
        }
    }
}