import express from 'express'
import DealsCategoryController from '../../controllers/dealsCategory/index.mjs'
import AuthMiddleware from '../../middleware/auth.mjs'

const Router = express.Router()

const Controller = new DealsCategoryController
const Middleware = new AuthMiddleware

Router.get('/',Middleware.loggedIn,Controller.get)
Router.get('/:id',Middleware.loggedIn,Controller.getOne)
Router.post('/',Middleware.loggedIn,Controller.create)
Router.put('/:id',Middleware.loggedIn,Controller.update)
Router.delete('/:id',Middleware.loggedIn,Controller.delete)

export {Router}