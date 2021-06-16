const Article = require('../../../repositories/models/articleModel')

module.exports = {
    async deleta (req, res, next) {
        try {
            const slug = req.params.slug
            const id = req.userId
    
            const busca = await Article.buscaBySlugAndId(slug, id)
    
            if (busca != undefined) {
    
                const apaga = await Article.apagaPostagem(slug, id)
    
                return res.status(200).json({ success: true, message: "Publicação apagada."})
            } else {
                return res.status(404).json({ success: false, message: "Publicação não encontrada."})
            }
        } catch {
            return res.status(500).json({ success: false, message: "Houve algum erro."})
        }
    }
}