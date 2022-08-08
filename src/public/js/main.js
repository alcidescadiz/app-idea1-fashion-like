"use strict"
// @ts-check

import Router from "../modules/Router.clouser.js";
import {Menu, LoginHTML,Admin ,Gallery,RenderGallery, Foot,Register} from '../components/index.js'
let [Loading, Route, Render, RenderEvent, PageNotFound, Login] = Router();

if (sessionStorage.getItem("sessionAppFashion")){
    //@ts-ignore: Object is possibly 'null'.
    let {status, email, like, dislike } = JSON.parse(sessionStorage.getItem("sessionAppFashion"))
    //@ts-ignore: Object is possibly 'null'.
    Login( {status, email, like, dislike })
}else{
    window.location.hash= '#login' 
}

//@ts-ignore: Object is possibly 'null'.
Route({                    template: Menu,        props: [Login],  protect: false  });
//@ts-ignore: Object is possibly 'null'.
Route({ path: "",          template: Gallery,     props: [Login],  protect: false  });
//@ts-ignore: Object is possibly 'null'.
Route({ path: "#login",    template: LoginHTML,   props: [Login],  protect: false  });
//@ts-ignore: Object is possibly 'null'.
Route({ path: "#register", template: Register,                     protect: false  });
//@ts-ignore: Object is possibly 'null'.
Route({ path: "#admin",    template: Admin,       props: [Login],  protect: true  });
//@ts-ignore: Object is possibly 'null'.
Route({                    template: Foot,                         protect: false  });

Render();
RenderEvent();

window.addEventListener('DOMContentLoaded', ()=>{
    let text = `
        █───█ █▀▀ █── █── █▀▀ █▀▀█ █▀▄▀█ █▀▀ 
        █▄█▄█ █▀▀ █── █── █── █──█ █─▀─█ █▀▀ 
        ─▀─▀─ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀▀ ▀───▀ ▀▀▀
    `
    console.log(text)
}, {once:true})

//--> eventos de Gallery
function upateSesionStorage(newLikes, newDislikes){
    if (sessionStorage.getItem("sessionAppFashion")){
        //@ts-ignore: Object is possibly 'null'.
        let {email} = JSON.parse(sessionStorage.getItem("sessionAppFashion"))
        sessionStorage.setItem("sessionAppFashion", JSON.stringify({status: true, email, like:newLikes, dislike:newDislikes }))
    }    
}
document.addEventListener("click", (e) => {
    //@ts-ignore: Object is possibly 'null'.
    if(e.target.innerHTML === "Like" || e.target.innerHTML === "Dislike"){
        //@ts-ignore: Object is possibly 'null'.
        if(Login().status === true){
            fetch(window.location.origin+'/v1-api-users/favorite',
                {
                    body: JSON.stringify({
                      //@ts-ignore: Object is possibly 'null'.
                      data: e.target.name,
                      //@ts-ignore: Object is possibly 'null'.
                      likeDislike: e.target.innerHTML.toLowerCase()
                    }),
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
            ).then(res => res.json())
              .then(json => {
                if(json.user.error){
                    alert(json.user.error)
                    //@ts-ignore: Object is possibly 'null'.
                    Login({ status:true, email: json.user.email, like:json.user.like,  dislike:json.user.dislike })
                }
                if(json.user.email){
                    //@ts-ignore: Object is possibly 'null'.
                  Login({ status:true, email: json.user.email, like:json.user.like,  dislike:json.user.dislike })
                  upateSesionStorage(json.user.like, json.user.dislike )
                  RenderGallery(json.user.like,json.user.dislike);
                }
            })
        }else{
            alert('registrese x favor')
            window.location.hash= '#login' 
        }
    }
  });