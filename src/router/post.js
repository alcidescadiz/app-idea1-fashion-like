import {Router } from 'express'
const router = Router()
import { allPost, createPost, deletePost, updatePost } from '../controller/post.controller.js'
import { Auth } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/isAdmin.middleware.js'

router.get('/', allPost)
router.post('/', Auth,isAdmin, createPost)
router.delete('/:idpost', Auth, isAdmin, deletePost)
router.put('/:idpost', Auth, isAdmin, updatePost)

export {router}