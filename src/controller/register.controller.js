import { addDB, isEmailUnique } from "../services/lowdb.repository.js";
import { v4 } from "uuid";
const database = "users"

export function Register(req, res) {
    try {
      const { name, lastname, email, password } = req.body;
      if(!isEmailUnique(email, database)) throw "Email ya registrado"
      addDB({ id:v4() ,name, lastname, email, password, favorities: [] }, database)
      res
        .status(200)
        .send({msg: "Usuario agregado con éxito"});
    } catch (error) {
      res.status(400).send({
        error: error,
        msg: "Algo mal ha pasado revise los datos enviados",
      });
    }
  }