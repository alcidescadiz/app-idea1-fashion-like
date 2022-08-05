export function Menu ([fn]){
    let status = fn().status
    let login = status === false || status === null ? `<a class="nav-link active" aria-current="page" href='#login'> Login </a>` : ''
    let register = status === false || status === null ? `<a class="nav-link active" aria-current="page" href="#register"> Register </a>` : ''
    let admin = status === true ? `<a class="nav-link active" aria-current="page"href='#admin'> Admin </a>` : ''
    let logout = status === true ? `<button class="btn btn-outline-success" id="btnLogout">LogOut</button>` : '<button class="d-none" id="btnLogout"></button>'
    let div = document.createElement('div')
    div.classList = "sticky-top"
    let templete= `
     <nav class="navbar navbar-expand-sm bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Fashion Ideas</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                    
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Gallery</a>
                    </li>

                    <li class="nav-item">
                        ${admin}
                    </li>

                </ul>
                <div class="navbar-nav  my-2 my-lg-0 navbar-nav-scroll">
                            ${register}
                            ${login}
                            ${logout}
                </div>
            </div>
        </div>
      </nav>
    `
    setTimeout(()=>{
        document.getElementById('btnLogout').addEventListener('click', ()=>{
            fn({status: false, token:'' })
        })
    },10)
    div.innerHTML = templete
    return div
}
