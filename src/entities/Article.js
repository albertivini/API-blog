const Sequelize = require('sequelize')
const Database = require('../repositories/config/db')

const Article = Database.define('article', {
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
    slug: { 
        type: Sequelize.STRING,
        allowNull: false,
    },
    title: { 
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: { 
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: { 
        type: Sequelize.STRING,
        allowNull: false,
    },
    taglist: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Article