import {Router } from 'express'
const router = Router()
import { Login } from '../controller/login.controller.js'

router.get('/', Login)

export {router}


