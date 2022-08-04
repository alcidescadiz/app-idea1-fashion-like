import {Router } from 'express'
const router = Router()
import { Register } from '../controller/register.controller.js'

router.get('/', Register)

export {router}