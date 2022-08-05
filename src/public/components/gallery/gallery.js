export function Gallery() {
    let div = document.createElement('div')
    let post = ``
    fetch(window.location.origin+'/v1-api-post',
    {
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            "x-access-token": "yfkuyfu"
        }
    }
    ).then(res => res.json())
     .then(json => {
        json.posts.map(e=>{
            post += `
            <div class="card m-3" style="max-width: 100%;">
              <div class="row g-0">
                <div class="col-md-4">
                    <img src=${e.img} class="img-fluid rounded-start w-100" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${e.post}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">${e.date}</small></p>
                    </div>
                    <br>
                    <br>
                    <div class="position-absolute bottom-0 end-0 m-2">
                        <button id="like" class="btn btn-primary me-md-2" type="button">Like</button>
                        <button id="dislike" class="btn btn-warning" type="button">Dislike</button>
                    </div>
                </div>
              </div>
            </div>
            `

    })
        let templete= `
            <div class='container'>
                <div class="g-2">
                    ${post}
                </div> 
            </div>
        `
        div.innerHTML = templete
    })


return div
    

}