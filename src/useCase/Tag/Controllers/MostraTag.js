const Article = require('../../../repositories/models/articleModel')

module.exports = {
    async mostra (req, res, next) {
        try {

            const buscaTags = await Article.listaTags()

            const tags = buscaTags.map(tags =>{
                return JSON.parse(tags.taglist)
                })

            return res.status(200).json({tags})

        } catch (err) {
            return res.status(404).json({ success: false, message: "Não foi possível encontrar as tags."})
        }
    }
}