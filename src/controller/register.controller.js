import { addDB, getAllDb, isEmailUnique } from "../services/lowdb.repository.js";
import { v4 } from "uuid";
const database = "users"

export async function Register(req, res) {
    try {
      const { name, lastname, email, password } = req.body;
      if(!isEmailUnique(email, database)) throw "Email ya registrado"
      let totalUsers = await getAllDb(database)
      if(totalUsers.length >= 2) throw "Capacidad de usuarios maxima registrada"
      addDB({ id:v4() ,name, lastname, email, password, like: [], dislike: [] }, database)
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