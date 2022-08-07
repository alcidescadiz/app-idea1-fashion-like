import Router from "../modules/Router.clouser.js";
import {Menu, Login as login,Admin ,Gallery,RenderGallery, Foot,Register} from '../components/index.js'
let [Loading, Route, Render, RenderEvent, PageNotFound, Login] = Router();

if (sessionStorage.getItem("sessionAppFashion")){
    let {status, name, like, dislike } = JSON.parse(sessionStorage.getItem("sessionAppFashion"))
    Login( {status, name, like, dislike })
}else{
    window.location.hash= '#login' 
}


Route({                    template: Menu,        props: [Login],  protect: false  });
Route({ path: "",          template: Gallery,     props: [Login],  protect: false  });
Route({ path: "#login",    template: login,       props: [Login],  protect: false  });
Route({ path: "#register", template: Register,                     protect: false  });
Route({ path: "#admin",    template: Admin,                        protect: true  });
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
document.addEventListener("click", (e) => {
    if(e.target.innerHTML === "Like" || e.target.innerHTML === "Dislike"){
        if(Login().status === true){
            fetch(window.location.origin+'/v1-api-users/favorite',
                {
                    body: JSON.stringify({
                      data: e.target.name,
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
                    Login({ status:true, name: json.user.name, like:json.user.like,  dislike:json.user.dislike })
                }
                if(json.user.name){
                  Login({ status:true, name: json.user.name, like:json.user.like,  dislike:json.user.dislike })
                  RenderGallery(json.user.like,json.user.dislike);
                }
            })
        }else{
            alert('registrese x favor')
            window.location.hash= '#login' 

        }
    }

  });