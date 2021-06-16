const Database = require('../../repositories/config/db')
const Comment = require('../../entities/Comment')
const { QueryTypes } = require('sequelize')
const sequelize = require('../config/db')
require('../../repositories/config/associations').associations()


module.exports = {
    async insereComment (body, idPost, idUser) {
        try {
            await Database.sync()
            const insere = await Comment.create({
                body: body,
                idUser: idUser,
                idPost: idPost
            })
        return insere
        } catch (err) {
            console.log(err)
        }
    },

    async deletaComment (idPost, idUser, idComment) {
        try {
            await Database.sync()

            const deleta = await Comment.destroy({
                where: {
                    id: idComment,
                    idPost: idPost,
                    idUser: idUser
                }
            })
        } catch (err) {
            console.log(err)
        }

    },

    async buscaComments (idPost) {
        try {
            await Database.sync()

            const busca = await Comment.findAll({
                where: {
                    idPost: idPost
                }
            })
    
            if (busca == null) {
                return false
            } else {
                return busca
            }
        } catch (err) {
            console.log(err)
        }

    }
}