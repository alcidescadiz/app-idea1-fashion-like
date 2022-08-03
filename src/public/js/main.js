import Router from "../modules/Router.clouser.js";
import {Menu, Login as login, Gallery, Foot,Register} from '../components/index.js'
let [Loading, Route, Render, RenderEvent, PageNotFound, Login] = Router();

//Login({status: true, token: 'Alcides'})
Route({                    template: Menu,                         protect: false  });
Route({ path: "",          template: Gallery,                      protect: false  });
Route({ path: "#login",    template: login,                        protect: false  });
Route({ path: "#register", template: Register,                     protect: false  });
// Route({ path: "#inputs", template: jsonFetch,                   protect: false  });
// Route({ path: "#inputs", template: componentTable,              protect: false  });
// Route({ path: "#login",  template: htmlLogin,   props: [Login], protect: false  });
// Route({ path: "#logOut", template: htmlLogOut,  props: [Login], protect: true   });
Route({                    template: Foot,                         protect: false  });

Render();
RenderEvent();