import { v4 } from "uuid";
import { addDB, getAllDb } from "../services/lowdb.repository.js";
const database = "post"

export async function allPost(req, res){
    try {
        const posts = await getAllDb(database)
        res.status(200).json({posts});
      } catch (error) {
        res.status(400).send({
          error: error,
          msg: "Algo mal ha pasado revise los datos enviados",
        });
      }
}


export function createPost(req, res){
    try {
        const { post, img, voto } = req.body;
        const date = new Date().toString().split(' ').splice(0,4).join(" ")
        addDB({ id:v4() ,post, img, voto, date}, database)
        res
          .status(200)
          .send({msg: "Post agregado con éxito"});
      } catch (error) {
        res.status(400).send({
          error: error.message,
          msg: "Algo mal ha pasado revise los datos enviados",
        });
      }
}