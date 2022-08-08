import {Router } from 'express'
const router = Router()
import { allPost, createPost, deletePost, updatePost } from '../controller/post.controller.js'
import { Auth } from '../middleware/auth.middleware.js'

router.get('/', allPost)
router.post('/', Auth, createPost)
router.delete('/:idpost', Auth, deletePost)
router.put('/:idpost', Auth, updatePost)

export {router}