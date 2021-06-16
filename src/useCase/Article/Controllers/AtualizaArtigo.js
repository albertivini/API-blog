const Article = require('../../../repositories/models/articleModel')
const atualizaMiddleware = require('../Middlewares/atualizaPostagem')

module.exports = {
    async atualiza (req, res, next) {
        try {
            const slug = req.params.slug
            const id = req.userId
    
            const buscando = await Article.buscaBySlugAndId(slug, id)

            if (buscando != undefined) {
                
                const novosDados = req.body
                
                if(novosDados.title == undefined) {
                    const article = await atualizaMiddleware.atualizaPostagemSemTitle(novosDados, slug, id)
                    return res.status(202).json(article)    
                } else {
                    const article = await atualizaMiddleware.atualizaPostagemComTitle(novosDados, slug, id)
                    return res.status(202).json(article)    
                }

            } else {
                return res.status(406).json({ message: "Não foi possível atualizar a publicação."})
            }
        } catch (err) {
            return res.status(500).json({ sucess: false, message: "Houve algum erro."})
        }

    }
}