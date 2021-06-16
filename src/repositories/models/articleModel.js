const Database = require('../config/db')
const Article = require('../../entities/Article')
const User = require('../../entities/User')
const Follow = require('../../entities/Follow')
const { QueryTypes } = require('sequelize')
const sequelize = require('../config/db')
require('../../repositories/config/associations').associations()


module.exports = {
    async insereArtigo (id, slug, title, description, body, taglist) {
        try {
            await Database.sync()

            console.log("slug dentro do model " + slug)
            console.log("taglist dentro do model " + taglist)

            const cria = await Article.create( {
                idUser: id,
                slug: slug,
                title: title,
                description: description,
                body: body,
                taglist: taglist
            })

        } catch (err) {
            console.log(err)
        }
    },

    async buscaBySlug (slug) {
        try {
            await Database.sync()

            const busca = await Article.findOne({ 
                where: { slug: slug}
            })

            if (busca == null) {
                return false
            } else {
                return busca
            }

        } catch (err) {
            console.log(err)
        }
    },

    async buscaBySlugAndId (slug, id) {
        try {
            await Database.sync()

            const busca = await Article.findOne({
                where: { 
                    idUser: id,
                    slug: slug
                }
            })

            if (busca == null) {
                return undefined
            } else {
                return busca
            }
        } catch (err) {
            console.log(err)
        }
    },

    async atualizaPostagem (dados, novoSlug, slug, id) {
        try {
            await Database.sync()

            console.log("dentro do model " + dados.title)

            const atualiza = await Article.update(
                dados,
                { where: {
                    idUser: id,
                    slug: slug,
            }})

            const atualizaSlug = await Article.update(
                {slug: novoSlug}, 
                { where: {
                    idUser: id,
                    slug: slug,
                }}
            )

        } catch (err) {
            console.log(err)
        }
    },

    async atualizaPostagemSemSlug (dados, slug, id) {
        try {
            await Database.sync()

            const atualiza = await Article.update(
                dados,
                { where: {
                    idUser: id,
                    slug: slug,
            }})

        } catch (err) {
            console.log(err)
        }
    },

    async apagaPostagem (slug, id) {
        try {
            await Database.sync()

            await Article.destroy({ 
                where: {
                    idUser: id,
                    slug: slug
            }})
        } catch (err) {
            console.log(err)
        }
    },

    async buscaTodasPostagens () {
        try {
            await Database.sync()

            const busca = await Article.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            return busca

        } catch (err) {
            console.log(err)
        }
    },

    async PostagensSeguindo (id) {
        try {
            await Database.sync()

            const postagens = await Article.findAll({ 
                where: {
                    idUser: id
                }
            })
            return postagens
        } catch (err) {
            console.log(err)
        }
    },

    async PostagensDosSeguidos (idSeguindo) {
        try {
            await Database.sync()

            const postagens = await Article.findAll({
                include: [{
                    model: Follow,
                    required: true,
                    where: { idSeguindo : idSeguindo },
                    include: [{ model: User, required: true, where: { id: idSeguindo }}]
                }]
            })
    
            return postagens
        } catch (err) {
            console.log(err)
        }
    },

    async rawQuerieBuscaTodos (id) {
        try {
            const [ results ] = await sequelize.query("SELECT `article`.`id`, `article`.`slug`, `article`.`title`, `article`.`description`, `article`.`body`, `article`.`taglist`, `article`.`createdAt`, `article`.`updatedAt`, `follow->user`.`id` AS `follow.user.id`, `follow->user`.`username` AS `follow.user.username`, `follow->user`.`email` AS `follow.user.email`, `follow->user`.`bio` AS `follow.user.bio`, `follow->user`.`image` AS `follow.user.image` FROM `articles` AS `article` INNER JOIN `follows` AS `follow` ON `article`.`idUser` = `follow`.`idSeguido` AND `follow`.`idSeguindo` = :idSeguindo INNER JOIN `users` AS `follow->user` ON `follow`.`idSeguido` = `follow->user`.`id` AND `follow->user`.`id` = `follow`.`idSeguido` ORDER BY `article`.`createdAt` DESC ", { 
                replacements: { idSeguindo: id },
                type: QueryTypes.RAW})
   
            return results
        } catch (err) {
            console.log(err)
        }
    },

    async listaTags () {
        try {
            await Database.sync()

            const results = await Article.findAll({
                attributes: ['taglist'] 
            })
            return results
        } catch (err) {
            console.log(err)
        }
    }
    
}