// npm i express cors dotenv ejs
import path from 'path'
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import express from 'express'
import cors from  'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

import { router as Login} from './router/login.js'
import { router as Register} from './router/register.js'
import { router as Users} from './router/users.js'
import { router as Post} from './router/post.js'

app.use ('/v1-api/login', Login)
app.use ('/v1-api/register', Register)
app.use ('/v1-api-users', Users)
app.use ('/v1-api-post', Post)

app.get('/', (req, res)=>{
    res.render('index', {title: 'Home page'})
})

export default app
