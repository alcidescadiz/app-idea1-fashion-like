import {Router } from 'express'
const router = Router()
import { Login, Logout } from '../controller/login.controller.js'

router.post('/', Login)
router.post('/logout', Logout)

export {router}


