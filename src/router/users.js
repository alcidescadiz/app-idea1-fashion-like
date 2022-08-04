import {Router } from 'express'
const router = Router()
import { allUsers } from '../controller/users.controller.js'

router.get('/', allUsers)

export {router}
