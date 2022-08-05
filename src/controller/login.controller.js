import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const KEY = process.env.KEY
import { getOneDb } from "../services/lowdb.repository.js";

const database = "users"

export async function Login(req, res) {
    try {
      const {email, password} = req.body
      const user = await getOneDb(email, database)
      if(user.email === email && user.password === password){
          const token = jwt.sign(user,KEY,{ expiresIn: '48h' });
          res.status(200).json({token});
      }else{
        throw "Error en los datos"
      }
    } catch (error) {
      res.status(400).send({
        error: error.message,
        msg: "Ud no tiene autorización",
      });
    }
  }