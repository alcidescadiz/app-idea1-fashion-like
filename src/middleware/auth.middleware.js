import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getOneDb } from "../services/lowdb.repository.js";
dotenv.config();

const KEY = process.env.KEY

export async function Auth(req, res, next){
    const {cookie}= req.headers
    if(cookie){
        const variable = {
            key : cookie.split('=')[0],
            token : cookie.split('=')[1]
        }
        const {email, password} = jwt.verify(variable.token, KEY);
        const user = await getOneDb(email, 'users')
        req.idUser = user.id
        if(email === user.email && password === user.password) next()
        return
    }
    res.json({error: 'Datos errones o no esta registrado'})
}