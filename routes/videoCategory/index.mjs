import express from 'express'
import VideoCategoryController from '../../controllers/videoCategory/index.mjs'
import AuthMiddleware from '../../middleware/auth.mjs'

const Router = express.Router()

const Controller = new VideoCategoryController
const Middleware = new AuthMiddleware

Router.get('/',Controller.get)
Router.get('/:id',Controller.getOne)
Router.post('/',Middleware.loggedIn,Controller.create)
Router.put('/:id',Middleware.loggedIn,Controller.update)
Router.delete('/:id',Middleware.loggedIn,Controller.delete)

export {Router}