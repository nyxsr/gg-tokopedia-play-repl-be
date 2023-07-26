import express from 'express'
import AuthController from '../../controllers/auth/index.mjs'

const Router = express.Router()

const Controller = new AuthController

Router.post('/login',Controller.login)

export {Router}