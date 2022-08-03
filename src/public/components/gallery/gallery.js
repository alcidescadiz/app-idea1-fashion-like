export function Gallery() {
    let div = document.createElement('div')
    let templete= `
     <div class='container'>
        gallery
     </div>
    `
    div.innerHTML = templete
    return div
}