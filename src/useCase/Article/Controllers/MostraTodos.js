const ResponseMiddleware = require('../Middlewares/responseMostraTodos')

module.exports = {
    async show (req, res, next) {
        try {
            ResponseMiddleware.pegaResponse().then(articles => {
                return res.status(200).json({articles})
            })
        } catch (err) {
            return res.status(500).json({ success: false, message: "Houve algum erro"})
        }
    }
}
