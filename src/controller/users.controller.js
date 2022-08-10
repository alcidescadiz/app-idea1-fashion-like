import { addFavoriteToUser } from "../services/lowdb.repository.js"
const database = "users"

export function allUsers(req, res){
    res.send({hello: 'world all users'})
}

export function addFavorite(req, res){
    const { data:idpost , likeDislike} =req.body
    const {idUser} = req
    let users = addFavoriteToUser(idUser,idpost, likeDislike ,database )

    if (users[0].error){ 
        res.json({error: users[0]})
        return
    }
    let user = users.filter(e=> e.id === idUser)
    res.json({user: user[0]})
}