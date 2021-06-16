const Database = require('./db')
const User = require('../../entities/User')
const Article = require('../../entities/Article')
const Follow = require('../../entities/Follow')
const Comment = require('../../entities/Comment')
const Favorite = require('../../entities/Favorite')

function associations () {
    User.hasMany(Article, {foreignKey: 'idUser'}) // um user tem muitos artigos
    Article.belongsTo(User, {foreignKey: 'idUser'}) // um artigo pertence a um user

    User.hasMany(Comment, {foreignKey: 'idUser'}) // um user tem muitos comments
    Article.hasMany(Comment, {foreignKey: 'idPost'}) // um artigo tem muitos comentarios
    Comment.belongsTo(User, {foreignKey: 'idUser'}) // um comment pertence a um user

    Article.hasMany(Favorite, {foreignKey: 'idPost'}) // um artigo tem muitos favoritos
    Favorite.belongsTo(User, {foreignKey: 'idUser'}) // um favorito pertence a um usuario

    User.hasMany(Follow, {foreignKey: 'idSeguindo'}) // um usuario segue muitas pessoas
    Follow.belongsTo(User, {foreignKey: 'idSeguindo'}) // um seguido pertence a um usuário

    Follow.hasMany(Article, {foreignKey: 'idUser'}) // um seguidor tem muitos artigos
    Article.belongsTo(Follow, {foreignKey: 'idUser'}) // um artigo pertence a um seguidor

}

module.exports = { associations }



