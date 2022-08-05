import {Router } from 'express'
const router = Router()
import { Login } from '../controller/login.controller.js'

router.post('/', Login)

export {router}


