const Sequelize = require('sequelize')
const Database = require('../repositories/config/db')

const Favorite = Database.define('favorite', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idPost: {
        type: Sequelize.INTEGER,
        references: { model: 'articles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    idUser: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }, 
},{ timestamps: false})

module.exports = Favorite