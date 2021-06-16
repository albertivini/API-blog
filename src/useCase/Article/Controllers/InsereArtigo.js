const Article = require('../../../repositories/models/articleModel')
const slugMiddleware = require('../Middlewares/slugTitle')

module.exports = {
    async insere (req, res, next) {
        try {
            const idUsuario = req.userId
            const title = req.body.title
            const body = req.body.body
            const description = req.body.description
            const taglist = req.body.tagList
            const taglistStringify = JSON.stringify(taglist)
            const slug = slugMiddleware.slugTitle(title)
    
            const insere = await Article.insereArtigo(
                idUsuario, slug, title, description, body, taglistStringify)
            
            return res.status(200).json({ success: true, message: 'Publicação feita.'})    
        } catch (err) {
            return res.status(500).json({ success: false, message: 'Erro na inserção do artigo.'})
        }

    }
}