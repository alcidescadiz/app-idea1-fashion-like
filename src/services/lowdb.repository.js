import {getConnection} from "./dataLowDb.js";


export async function addDB(params, database) {
    getConnection().data[database].push(params)
    getConnection().write()
}

export async function getOneDb(email, database) {
    const element = getConnection().data[database].find(e=> e.email === email)
    return element
}
export async function getAllDb( database) {
    const elements = getConnection().data[database]
    return elements
}

export function isEmailUnique(email, database) {
    const element = getConnection().data[database].filter(e=> e.email === email)
    if(element.length > 0) return false
    if(element.length === 0) return true
}

export function removeOneDb(params) {
    
}
export function updateOnedB(params) {
    
}

export function addFavoriteToUser(idUser, idPost,likeDislike, database) {
    const user = getConnection().data[database].map(e=> {
        if (e.id !==  idUser) return e
        e[likeDislike].push(idPost)
        return e
    })
    getConnection().write()
    return user
}
