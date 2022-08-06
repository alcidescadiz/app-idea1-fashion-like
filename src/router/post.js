import {Router } from 'express'
const router = Router()
import { allPost, createPost } from '../controller/post.controller.js'
import { Auth } from '../middleware/auth.middleware.js'

router.get('/',Auth, allPost)
router.post('/', createPost)

export {router}