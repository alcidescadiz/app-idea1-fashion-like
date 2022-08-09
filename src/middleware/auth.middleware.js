import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getOneDb } from "../services/lowdb.repository.js";
dotenv.config();

/**@type {string|any} */
const KEY = process.env.KEY

export async function Auth(req, res, next){
    const {cookie}= req.headers
    if(cookie){
        const variable = {
            key : cookie.split('=')[0],
            token : cookie.split('=')[1]
        }
        //@ts-ignore: Object is possibly 'null'.
        const {email, password} = jwt.verify(variable.token, KEY);
        const user = await getOneDb(email, 'users')
        req.idUser = user.id
        req.email = user.email
        if(email === user.email && password === user.password) next()
        return
    }
    res.json({error: 'Datos errones o no esta registrado'})
}