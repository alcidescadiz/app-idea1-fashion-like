export function Register() {
    let div = document.createElement('div')
    let templete= `
     <div class='container'>
        <div class="display-1 text-center"> Register</div>
        <hr class="border border-danger border-2 opacity-50">
        <form id="submitRegister" class="container">
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                <input type="text" name="name"class="form-control" id="inputName">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Lastname</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" name="lastname" id="inputLastname">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                <input type="email" class="form-control" name="email" id="inputEmail">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                <input type="password" class="form-control" name="password" id="inputPassword">
                </div>
            </div>
            <hr>
            <div class="d-grid gap-2 col-6 mx-auto">
                <input type="submit"  class="btn btn-danger" value="Send Register"></input>
            </div>
        </fom>
     </div>
    `
    try {
        setTimeout(()=>{
            document.getElementById('submitRegister').addEventListener('submit',(e)=>{
                e.preventDefault()
                let data = {};
                let formData = document.getElementById('submitRegister').elements;
                for (let index = 0; index < 4; index++) {
                    data[formData[index].name] = formData[index].value;
                }
                fetch('http://localhost:3001/v1-api-register',
                    {
                        body: JSON.stringify(data),
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json',
                            "x-access-token": "yfkuyfu"
                        }
                    }
                ).then(res => {
                    if(res.statusText === 'OK'){
                        document.getElementById('submitRegister').reset()
                        window.location.hash= '#'
                    }
                })
            },{once:true})
        },10)
    } catch (error) {
    }
    div.innerHTML = templete
    return div
}