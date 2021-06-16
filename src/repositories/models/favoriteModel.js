const Database = require('../../repositories/config/db')
const Favorite = require('../../entities/Favorite')
require('../config/associations').associations()

module.exports = {
    async confereFavorite (idPost, idUser) {
        try {
            await Database.sync()

            const confere = await Favorite.findOne({ 
                where: {
                    idPost: idPost,
                    idUser: idUser
                }
            })
    
            if (confere == null) {
                return false
            } else {
                return true
            }
        } catch (err) {
            console.log(err)
        }
    },

    async favoritaArtigo (idPost, idUser) {
        try {
            await Database.sync()
    
            const favorita = await Favorite.create({
                idPost: idPost,
                idUser: idUser
            })
    
        } catch (err) {
            console.log(err)
        }

    },

    async contaFavoritos (idPost) {
        try {
            await Database.sync()

            const { count } = await Favorite.findAndCountAll({
                where: {
                    idPost: idPost
                }
            })
    
            return count   
        } catch (err) {
            console.log(err)
        }

    },

    async desfavoritaArtigo (idPost, idUser) {
        try {
            await Database.sync()

            const desfavorita = await Favorite.destroy({ 
                where: {
                    idPost: idPost,
                    idUser: idUser
                }
            })
        } catch (err) {
            console.log(err)
        }

    }
}