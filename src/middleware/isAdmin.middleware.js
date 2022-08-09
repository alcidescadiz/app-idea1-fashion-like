export async function isAdmin(req, res, next){

    const { email } = req
    if(email === 'admin@mail.com') {
        next()
        return 
    }
    res.json({error: ['Ud no es administrador']})
}