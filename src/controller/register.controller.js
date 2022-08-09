import { addDB, getAllDb, isEmailUnique } from "../services/lowdb.repository.js";
import { v4 } from "uuid";
import bcrypt from 'bcrypt'
import { ValidarEsquema } from "validaresquema";
import { UserEsquema } from "../entities/user.entity.js";
const database = "users"

export async function Register(req, res) {
    try {
      const { name, lastname, email, password } = req.body;
      if(!isEmailUnique(email, database)) throw "Email ya registrado"

      let totalUsers = await getAllDb(database)
      if(totalUsers.length >= 10) throw "Capacidad de usuarios maxima registrada"
      
      const validaciones =  ValidarEsquema(UserEsquema(name,lastname,email,password))
      if (validaciones.Result === 'Errors') throw validaciones.Response

      const salt = await bcrypt.genSalt(10);
      const passwordCode= await bcrypt.hash(password, salt);

      addDB({ 
        id:v4() ,
        name: validaciones.Response.name, 
        lastname: validaciones.Response.lastname, 
        email: validaciones.Response.email, 
        password:passwordCode, 
        like: [], dislike: [] 
      }, database)

      res
        .status(200)
        .send({msg: "Usuario agregado con éxito"});
    } catch (error) {
      res.status(400).json({
        error: error,
        msg: "Algo mal ha pasado revise los datos enviados",
      });
    }
  }