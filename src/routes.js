const express = require('express')
const router = express.Router()

// Middlewares
const JWTMiddleware = require('./services/verifyJWTMiddleware')

// USUÁRIO

const CriaController = require('./useCase/Usuario/Controllers/CriaUsuario')
const LoginController = require('./useCase/Usuario/Controllers/LoginUsuario')
const MostraController = require('./useCase/Usuario/Controllers/MostraUsuario')
const AtualizaController = require('./useCase/Usuario/Controllers/AtualizaUsuario')
const MostraProfileController = require('./useCase/Profile/Controllers/MostraProfile')

router.post('/api/users', CriaController.cria) // registro
router.post('/api/users/login', LoginController.login) // autenticacao
router.get('/api/user', JWTMiddleware.verifyJWT, MostraController.show) // pega o usuario atual
router.put('/api/user', JWTMiddleware.verifyJWT, AtualizaController.atualiza) // atualiza usuario
router.get('/api/profiles/:username', JWTMiddleware.verifyJWT, MostraProfileController.show) // pega o perfil

// FOLLOW

const FollowController = require('./useCase/Profile/Controllers/Follow.js')

router.post('/api/profiles/:username/follow', JWTMiddleware.verifyJWT, FollowController.follow) // follow
router.delete('/api/profiles/:username/unfollow', JWTMiddleware.verifyJWT, FollowController.unfollow) // unfollow

// ARTIGOS

const insereArtigoController = require('./useCase/Article/Controllers/InsereArtigo')
const atualizaArtigoController = require('./useCase/Article/Controllers/AtualizaArtigo')
const deletaArtigoController = require('./useCase/Article/Controllers/DeletaArtigo')
const mostraBySlugController = require('./useCase/Article/Controllers/MostraBySlug')
const mostraTodosController = require('./useCase/Article/Controllers/MostraTodos')
const mostraFeedController = require('./useCase/Article/Controllers/MostraFeed')

router.get('/api/articles', mostraTodosController.show) // todos os artigos
router.get('/api/articles/feed', JWTMiddleware.verifyJWT, mostraFeedController.feed) // feed de seguidores
router.get('/api/articles/:slug', mostraBySlugController.show) // artigo pelo nome
router.post('/api/articles', JWTMiddleware.verifyJWT, insereArtigoController.insere) //insere artigo
router.put('/api/articles/:slug', JWTMiddleware.verifyJWT, atualizaArtigoController.atualiza) // atualiza artigo
router.delete('/api/articles/:slug', JWTMiddleware.verifyJWT, deletaArtigoController.deleta) // deleta artigo

// COMENTÁRIOS

const insereCommentController = require('./useCase/Comments/Controllers/InsereComment')
const deletaCommentController = require('./useCase/Comments/Controllers/DeletaComment')
const mostraCommentController = require('./useCase/Comments/Controllers/MostraComment')

router.get('/api/articles/:slug/comments', mostraCommentController.mostra) // mostra todos os comments de um artigo
router.post('/api/articles/:slug/comments', JWTMiddleware.verifyJWT, insereCommentController.insere) // insere comment
router.delete('/api/articles/:slug/comments/:id', JWTMiddleware.verifyJWT, deletaCommentController.deleta) // deleta o comment

// FAVORITAR E TAG

const favoritaArtigoController = require('./useCase/Article/Controllers/FavoritaArtigo')
const desfavoritaArtigoController = require('./useCase/Article/Controllers/DesfavoritaArtigo')
const mostraTagController = require('./useCase/Tag/Controllers/MostraTag')

router.post('/api/articles/:slug/favorite', JWTMiddleware.verifyJWT, favoritaArtigoController.favorita) // favorita um artigo
router.delete('/api/articles/:slug/favorite', JWTMiddleware.verifyJWT, desfavoritaArtigoController.desfavorita) // desfavorita um artigo
router.get('/api/tags', mostraTagController.mostra) // retorna todas as tags


module.exports = router