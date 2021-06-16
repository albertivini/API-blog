const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

function verifyJWT(req, res, next) {
    try {
        // Bearer Token
        const token = req.headers.authorization.split(' ')[1]
    
        const publicKey = fs.readFileSync(path.resolve('src/services/keys/public.key'), 'utf8')
    
        jwt.verify(token, publicKey, { algorithm: ['RS256']}, function (err, decoded) {
            if (err) {
                console.log(err)
                return res.status(401).json({ auth: false, message: 'Falha na autenticação do token.' })
            } else {
                req.userId = decoded.id
                next()
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ auth: false, message: 'Falha na autenticação do token.' }) 
    }
}

module.exports = { verifyJWT }