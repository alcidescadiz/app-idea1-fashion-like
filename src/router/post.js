import {Router } from 'express'
const router = Router()
import { allPost } from '../controller/post.controller.js'

router.get('/', allPost)

export {router}