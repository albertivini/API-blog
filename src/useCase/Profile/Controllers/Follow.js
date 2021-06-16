const Profile = require('../../../repositories/models/profileModel')

module.exports = {
    async follow (req, res, next) {
        try {

            const idCurrentUser = req.userId
            const username = req.params.username

            const perfil = await Profile.buscaUsername(username)
            const confere = await Profile.confereFollow(idCurrentUser, perfil.id)

            if ((perfil.id == idCurrentUser) || (confere == true)) {
                res.status(405).json({ success: false, message: 'Operação nao permitida.' })
            } else {

                await Profile.insereFollow(idCurrentUser, perfil.id)

                const response = {
                        "user": {
                            "username": perfil.username,
                            "bio": perfil.bio,
                            "image": perfil.image,
                            "following": true
                        }
                }
                return res.status(200).json(response)
            }
        } catch (err) {
            res.status(500).json({success: false, message: 'Esse usuário não foi encontrado.'})
        }
    },

    async unfollow (req, res, next) {
        try {

            const idCurrentUser = req.userId
            const username = req.params.username
            const perfil = await Profile.buscaUsername(username)
            const confere = await Profile.confereFollow(idCurrentUser, perfil.id)

            if (perfil.id == idCurrentUser || confere == false) {
                res.status(405).json({ success: false, message: 'Operação nao permitida.' })
            } else {

                await Profile.deleteFollow(idCurrentUser, perfil.id)

                const response = {
                        "user": {
                            "username": perfil.username,
                            "bio": perfil.bio,
                            "image": perfil.image,
                            "following": false
                        }
                }
                return res.status(200).json(response)
            }
        } catch (err) {
            res.status(500).json({success: false, message: 'Esse usuário não foi encontrado.'})
        }
    }
}