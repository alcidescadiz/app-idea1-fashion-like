import { v4 } from "uuid";
import { addDB, getAllDb, removePost, updatingPost } from "../services/lowdb.repository.js";
import { postStadistic } from "../utils/postStadist.js";
const database = "post"

export async function allPost(req, res){
    try {
        const posts = await getAllDb(database)
        const users = await getAllDb("users")
        let topTenPost = postStadistic(users)
        res.status(200).json({posts, topTenPost});
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
export async function deletePost(req, res){
  try {
      const { idpost } = req.params;
      let response = await removePost(idpost, database)
      if(response === false) throw "No se pudo eliminar o post ya no existe";
      res
        .status(200)
        .send({msg: "Post eliminado con éxito"});
    } catch (error) {
      res.status(400).send({
        error: error,
        msg: "Algo mal ha pasado revise los datos enviados",
      });
    }
}

export async function updatePost(req, res){
  try {
      const { idpost } = req.params;
      const { post, img } = req.body.data;
      let response = await updatingPost({idpost, post, img }, database)
      if(response === false) throw "No se pudo actualizar o post ya no existe";
      res
        .status(200)
        .send({msg: "Post eliminado con éxito"});
    } catch (error) {
      res.status(400).send({
        error: error,
        msg: "Algo mal ha pasado revise los datos enviados",
      });
    }
}