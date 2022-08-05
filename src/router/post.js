import {Router } from 'express'
const router = Router()
import { allPost, createPost } from '../controller/post.controller.js'

router.get('/', allPost)
router.post('/', createPost)

export {router}