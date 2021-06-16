const app = require('./app');

const DbInit = {

        async syncDb() {

        const Database = require('./repositories/config/db')
        const User = require('./entities/User')
        const Article = require('./entities/Article')
        const Follow = require('./entities/Follow')
        const Favorite = require('./entities/Favorite')
        const Comment = require('./entities/Comment')

        await Database.sync()
    }
}

DbInit.syncDb()

app.listen(3000)