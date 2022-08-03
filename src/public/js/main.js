import Router from "../modules/Router.clouser.JS";
import {} from '../components/index.js'
let [Loading, Route, Render, RenderEvent, PageNotFound, Login] = Router();

//Login({status: true, token: 'Alcides'})

// Route({                  template: Menu,        props: [Login], protect: false  });
// Route({ path: "",        template: Home,                        protect: false  });
// Route({ path: "#about",  template: About,                       protect: true   });
// Route({ path: "#contac", template: Contac,                      protect: true   });
// Route({ path: "#inputs", template: jsonFetch,                   protect: false  });
// Route({ path: "#inputs", template: componentTable,              protect: false  });
// Route({ path: "#login",  template: htmlLogin,   props: [Login], protect: false  });
// Route({ path: "#logOut", template: htmlLogOut,  props: [Login], protect: true   });
// Route({                  template: piePagina                                    });

Render();
RenderEvent();