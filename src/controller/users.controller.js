import { addFavoriteToUser } from "../services/lowdb.repository.js"
const database = "users"

export function allUsers(req, res){
    res.send({hello: 'world all users'})
}

export function addFavorite(req, res){
    const { data:idpost , likeDislike} =req.body
    const {idUser} = req
    let user = addFavoriteToUser(idUser,idpost, likeDislike ,database )
    res.json({user: user[0]})
}