import express from 'express'
import AuthMiddleware from '../../middleware/auth.mjs'
import ProductController from '../../controllers/product/index.mjs'

const Router = express.Router()

const Controller = new ProductController
const Middleware = new AuthMiddleware

Router.get('/',Controller.get)
Router.get('/:id',Controller.getOne)
Router.post('/',Middleware.loggedIn,Controller.create)
Router.put('/:id',Middleware.loggedIn,Controller.update)
Router.delete('/:id',Middleware.loggedIn,Controller.delete)

export {Router}