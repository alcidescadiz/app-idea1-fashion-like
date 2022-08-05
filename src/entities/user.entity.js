export let UsersEntity = {
    name: {
        type:'string',
        requiered: true,
        min: 6
    },
    lastname:{
        type:'string',
        requiered: true,
        min: 6
    },
    email:{
        type:'email',
        requiered: true,
        min: 6
    },
    password:{
        type:'password',
        requiered: true,
        min: 6
    },
    favorities:{
        type: 'array'
    }


}