"use strict"
// @ts-check

let Router = () => {
    let loading = `Loading....`;
    //let template = ``;
    /**
     *@type {{status:null|boolean, name:string, like:Array, dislike:Array}}
     */
    let isLogin = { status: null, email: "", like:[], dislike:[] };
    let Routes = [];
    let NotFount = document.createElement('h1')
      NotFount.innerHTML= '<h2 class="container">Page not found</h2>'

    /**
     * @param {*} addLoading 
     * @returns 
     */  
    let Loading = (addLoading) => (loading = addLoading);

    /**
     * Route Añadir rutas al SPA
     * @param {{path:string|null,template:HTMLDivElement, protect:boolean, props:Array<any> }}  Object
     */
    let Route = ({ path = null, template, protect = false, props = [] }) => {
      Routes.push({ path, template, protect, props });
    };

    /**
     * @function Render
     * @params {string} idDiv
     * @returns void
     */
    let Render = (idDiv ='root') => {
      /**@type {HTMLElement} */
      //@ts-ignore: Object is possibly 'null'.
      let divRoot = document.getElementById(idDiv)
      try {
        divRoot.innerHTML = loading
        if (Routes.length === 0) {
          divRoot.innerHTML = ''
          divRoot.appendChild(NotFount);
          return;
        }
        setTimeout(() => {
          divRoot.innerHTML = ''
          let pathname = window.location.hash;
          if (!Routes.map((e) => e.path).includes(pathname)) {
            divRoot?.appendChild(Routes[0].template(Routes[0].props))
            divRoot.appendChild(NotFount);
            return;
          } else {
            Routes.map((e, i) => {
              if ((e.path === null || e.path === pathname) && e.protect === false) {
                //template += e.template(e.props);
                divRoot.append(e.template([...e.props]));
              } else {
                if (
                  e.path === pathname &&
                  e.protect === isLogin.status &&
                  e.protect === true
                ) {
                  //template += e.template(e.props);
                  divRoot.append(e.template([...e.props]));
                }
              }
            });
          }
        }, 10);
      } catch (error) {
      }
    };
    let RenderEvent = () => {
      try {
        window.addEventListener("hashchange", (e) => {
          console.log("render");
          Render();
        });
      } catch (error) {
      }
    };
    let PageNotFound = (addNotFound) => (NotFount = addNotFound);

    /**
     * @name Login
     * @param {{status:null|boolean, name:string, like:Array, dislike:Array}} param0 
     * @returns 
     */
    let Login = ({ status, email, like,  dislike } = isLogin) => {
      isLogin = { status, email, like,  dislike  };
      return isLogin;
    };
    return [Loading, Route, Render, RenderEvent, PageNotFound, Login];
  };

  export default Router
