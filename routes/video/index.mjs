import express from 'express'
import VideoController from '../../controllers/video/index.mjs'
import AuthMiddleware from '../../middleware/auth.mjs'

const Router = express.Router()

const Controller = new VideoController
const Middleware = new AuthMiddleware

Router.get('/',Controller.get)
Router.get('/:id',Controller.getOne)
Router.get('/comments/:id',Controller.getVideoComments)
Router.post('/search',Controller.getManyByFilter)
Router.post('/',Controller.create)
Router.put('/:id',Middleware.loggedIn,Controller.update)
Router.delete('/:id',Middleware.loggedIn,Controller.delete)

export {Router}