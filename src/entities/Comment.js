const Sequelize = require('sequelize')
const Database = require('../repositories/config/db')

const Comment = Database.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    idPost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'articles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    body: { 
        type: Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = Comment