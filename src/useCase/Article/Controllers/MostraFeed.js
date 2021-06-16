const ResponseMiddleware = require('../Middlewares/responseMostraFeed')

module.exports = {
    async feed (req, res, next) {
        try {
            const id = req.userId

            ResponseMiddleware.pegaResponseFeed(id).then(articles => {
                return res.status(200).json({articles})
            })
     
        } catch (err) {
            return res.status(404).json({ success: false, message: "Não foi possível mostrar o Feed"})
        }


    }
}