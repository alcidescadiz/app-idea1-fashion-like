import {Router } from 'express'
const router = Router()
import { addFavorite, allUsers } from '../controller/users.controller.js'
import { Auth } from '../middleware/auth.middleware.js'

router.get('/', allUsers)
router.post('/favorite', Auth, addFavorite)

export {router}
