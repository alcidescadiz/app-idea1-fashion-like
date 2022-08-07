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
    const [{like:likes, dislike:dislikes}] = getConnection().data[database].filter(e=> e.id === idUser)

    if (likeDislike === 'like' && dislikes.includes(idPost) && likes.length <2) {
        console.log('like pero esta en dislike')
        const user = getConnection().data[database].map(e=> {
            if (e.id !==  idUser) return e
            e['like'].push(idPost)
            e.dislike= e.dislike.filter(id => id !== idPost)
            return e
        })
        getConnection().write()
        return user
    }
    if (likeDislike === 'like' && likes.includes(idPost)) {
        const user = getConnection().data[database].map(e=> {
            if (e.id !==  idUser) return e
            e.like= e.like.filter(id => id !== idPost)
            return e
        })
        getConnection().write()
        return user
    }
    if (likeDislike === 'dislike' && likes.includes(idPost)&& dislikes.length < 2) {
        const user = getConnection().data[database].map(e=> {
            if (e.id !==  idUser) return e
            e['dislike'].push(idPost)
            e.like = e.like.filter(id => id !== idPost)
            return e
        })
        getConnection().write()
        return user
    }
    if (likeDislike === 'dislike' && dislikes.includes(idPost)) {
        const user = getConnection().data[database].map(e=> {
            if (e.id !==  idUser) return e
            e.dislike = e.dislike.filter(id => id !== idPost)
            return e
        })
        getConnection().write()
        return user
    }
    if (likeDislike === 'like' && likes.length >=2) return [{error: 'limite de favoritos superado'}]
    if (likeDislike === 'dislike' && dislikes.length >=2) return [{error: 'limite de no favoritos superado'}]
    const user = getConnection().data[database].map(e=> {
        if (e.id !==  idUser) return e
        e[likeDislike].push(idPost)
        return e
    })
    getConnection().write()
    return user
}
