const Database = require('../config/db')
const User = require('../../entities/User')
const Follow = require('../../entities/Follow')

module.exports = {
    async buscaUsername(username) {
        try {
            await Database.sync()

            const user = await User.findOne({ where: { username: username} })
    
            if (!user) {
                return undefined
            } else {
                return user
            }
        } catch (err) {
            console.log(err)
        }

    },

    async insereFollow (idCurrentUser, idFollow) {
        try {
            await Database.sync()

            const follow = await Follow.create({
                idSeguindo: idCurrentUser,
                idSeguido: idFollow
            })
        } catch (err) {
            console.log(err)
        } 
    },

    async confereFollow (idCurrentUser, idFollow) {
        try {
            await Database.sync()

            const confere = await Follow.findOne({ 
                where: { 
                    idSeguindo: idCurrentUser,
                    idSeguido: idFollow
                }
            })
    
            if (!confere) {
                return false
            } else {
                return true
            }
        } catch (err) {
            console.log(err)
        }

    },

    async deleteFollow(idCurrentUser, idFollow) {
        try {
            await Database.sync()

            const unfollow = await Follow.destroy({
                where: {
                    idSeguindo: idCurrentUser,
                    idSeguido: idFollow
                }
            })
        } catch (err) {
            console.log(err)
        }

    },

    async buscaSeguindo (idCurrentUser) {
        try {
            await Database.sync()
        
            const seguindo = await Follow.findOne({
                where: {
                    idSeguindo: idCurrentUser
                }
            })
    
            return seguindo
        } catch (err) {
            console.log(err)
        }

    }
}