let Router = () => {
    let loading = `Loading....`;
    //let template = ``;
    let isLogin = { status: null, token: "" };
    let Routes = [];
    let NotFount = document.createElement('h1')
      NotFount.innerHTML= '<h2 class="container">Page not found</h2>'
    let Loading = (addLoading) => (loading = addLoading);
    let Route = ({ path = null, template, protect = false, props = "" }) => {
      Routes.push({ path, template, protect, props });
    };
    let Render = () => {
      try {
        document.getElementById("root").innerHTML = loading
        if (Routes.length === 0) {
          document.getElementById("root").innerHTML = ''
          document.getElementById("root").appendChild(NotFount);
          return;
        }
        setTimeout(() => {
          document.getElementById("root").innerHTML = ''
          let pathname = window.location.hash;
          if (!Routes.map((e) => e.path).includes(pathname)) {
            document.getElementById("root").appendChild(NotFount);
            return;
          } else {
            Routes.map((e, i) => {
              if ((e.path === null || e.path === pathname) && e.protect === false) {
                //template += e.template(e.props);
                document.getElementById("root").append(e.template([...e.props]));
              } else {
                if (
                  e.path === pathname &&
                  e.protect === isLogin.status &&
                  e.protect === true
                ) {
                  //template += e.template(e.props);
                  document.getElementById("root").append(e.template([...e.props]));
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
    let Login = ({ status, token } = isLogin) => {
      isLogin = { status, token };
      return isLogin;
    };
    return [Loading, Route, Render, RenderEvent, PageNotFound, Login];
  };

  export default Router
