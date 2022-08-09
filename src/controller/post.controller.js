import { ValidarEsquema } from "validaresquema";
import { PostEsquema } from "../entities/post.entity.js";
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
        const { post, img, description } = req.body;
        const validaciones = ValidarEsquema(PostEsquema(post,img, description))
        if (validaciones.Result === 'Errors') throw validaciones.Response

        addDB(validaciones.Response , database)
        res
          .status(200)
          .send({msg: "Post agregado con éxito"});
      } catch (error) {
        res.status(400).send({
          error: error,
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
      const { post, img, description } = req.body.data;
      const validaciones = ValidarEsquema(PostEsquema(post,img, description))
      if (validaciones.Result === 'Errors') throw validaciones.Response

      let response = await updatingPost({idpost, post, img, description }, database)
      if(response === false) throw "No se pudo actualizar o post ya no existe";
      res
        .status(200)
        .send({msg: "Post editado con éxito"});
    } catch (error) {
      res.status(400).send({
        error: error
      });
    }
}