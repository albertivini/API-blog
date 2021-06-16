const Profile = require('../../../repositories/models/profileModel')

module.exports = {
    async show (req, res, next) {
        try {
            const idCurrentUser = req.userId 
            const username = req.params.username

            const dadosUser = await Profile.buscaUsername(username)
            const confere = await Profile.confereFollow(idCurrentUser, dadosUser.id)

            if (idCurrentUser == dadosUser.id) {

                const response = {
                    "user": {
                        "username": dadosUser.username,
                        "bio": dadosUser.bio,
                        "image": dadosUser.image
                    }
                }
                return res.status(200).json(response)

            } else {

                const response = {
                    "user": {
                        "username": dadosUser.username,
                        "bio": dadosUser.bio,
                        "image": dadosUser.image,
                        "following": confere
                    }
                }
                return res.status(200).json(response)
            }
        } catch (err) {
            return res.status(404).json({ message: 'Usuário não foi encontrado.'})
        }
    }
}