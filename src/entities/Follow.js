const Sequelize = require('sequelize')
const Database = require('../repositories/config/db')

const Follow = Database.define('follow', {
    idSeguindo: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    idSeguido: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }, 
},{ timestamps: false})

module.exports = Follow