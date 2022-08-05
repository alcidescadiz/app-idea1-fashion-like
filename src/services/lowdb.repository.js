import {getConnection} from "./dataLowDb.js";


export async function addDB(params, database) {
    getConnection().data[database].push(params)
    getConnection().write()
}

export async function getOneDb(email, database) {
    const element = getConnection().data[database].find(e=> e.email === email)
    return element
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