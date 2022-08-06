import { useState } from "../../modules/myUseSte.js"

export function Gallery([fn]) {
    let [gallery, setGallery] = useState('')
    let {status, like, dislike} = fn()
    if(!status) window.location.hash= '#login'

    let div = document.createElement('div')
    div.id = 'div-gallery-app'
    let post = ``
    if(!status) window.location.hash= '#login'
    function generateGallery(like, dislike){
        fetch(window.location.origin+'/v1-api-post')
             .then(res => res.json())
             .then(json => {
                json.posts.map(e=>{
                    let templateLike= `
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge rounded-pill text-bg-success">Favorite</span>
                    </div>`
                    let favorite= like.includes(e.id)? templateLike : ''
                    let templateDislike= `
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge rounded-pill text-bg-danger">Disapprove</span>
                    </div>`
                    let disgusting= dislike.includes(e.id)? templateDislike : ''
                    post += `
                    <div class="card m-3" style="max-width: 100%;">
                      <div class="row g-0">
                        <div class="col-md-4">
                            <img src=${e.img} class="img-fluid rounded-start w-100" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="position-relative bottom-0 start-0 m-2">
                                <span class="badge rounded-pill text-bg-secondary">${e.date}</span>
                            </div>
                            <div class="card-body">
                                ${favorite}
                                ${disgusting}
                            <h5 class="card-title">${e.post}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                            <br>
                            <br>
                            <div class="position-absolute bottom-0 end-0 m-2">
                                <button name=${e.id} class="btn btn-primary me-md-2" type="button">Like</button>
                                <button name=${e.id} class="btn btn-warning" type="button">Dislike</button>
                            </div>
                        </div>
                      </div>
                    </div>
                    `
            })
                setGallery(`
                    <div class='container pb-5'>
                        <div class="g-2 pb-4">
                            ${post}
                        </div> 
                    </div>
                `)
                
                div.innerHTML = gallery()
            })
    }
    generateGallery(like, dislike)
    
 
    return div
}



