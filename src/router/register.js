import {Router } from 'express'
const router = Router()
import { Register } from '../controller/register.controller.js'

router.post('/', Register )

export {router}