const Database = require('../config/db')
const User = require('../../entities/User')

module.exports = {
    async create (username, email, password) {
        try {
            await Database.sync()

            await User.create({
                username: username,
                email: email,
                password: password
            })

        } catch (err) {
            console.log(err)
        }
    },

    async buscaUserByEmail (email) {
        try {
            await Database.sync()

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (user == null) {
                return false
            } else {
                return user
            }

        } catch (err) {
            console.log(err)
        }
    },

    async buscaTodosUsuarios () {
        try {
            await Database.sync()
            const users = await User.findAll({})
            return users

        } catch (err) {
            console.log(err)
        }
    },

    async buscaUsuario (id) {
        try {
            await Database.sync()
            const user = await User.findByPk(id)

            if (!user) {
                return undefined
            } else {
                return user
            }
        } catch (err) {
            console.log(err)
        }
    },
    
    async atualizaUsuario (dados, id) {
        try {
            await Database.sync()

            const atualiza = await User.update(dados, { where: { id: id } })

        } catch (err) {
            console.log(err)
        }
    },
}