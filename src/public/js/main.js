import Router from "../modules/Router.clouser.js";
import {Menu, Login as login,Admin ,Gallery, Foot,Register} from '../components/index.js'
let [Loading, Route, Render, RenderEvent, PageNotFound, Login] = Router();


Route({                    template: Menu,        props: [Login],  protect: false  });
Route({ path: "",          template: Gallery,     props: [Login],  protect: false  });
Route({ path: "#login",    template: login,       props: [Login],  protect: false  });
Route({ path: "#register", template: Register,                     protect: false  });
Route({ path: "#admin",    template: Admin,                        protect: true   });
// Route({ path: "#inputs", template: componentTable,              protect: false  });
// Route({ path: "#login",  template: htmlLogin,   props: [Login], protect: false  });
// Route({ path: "#logOut", template: htmlLogOut,  props: [Login], protect: true   });
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
