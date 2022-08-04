export function Menu (){
    let div = document.createElement('div')
    let templete= `
     <div class='container'>
        <a href='#'> Gallery </a>
        <a href='#admin'> Admin </a>
        <a href='#login'> Login </a>
        <a href='#register'> Register </a>
     </div>
    `
    div.innerHTML = templete
    return div
}
