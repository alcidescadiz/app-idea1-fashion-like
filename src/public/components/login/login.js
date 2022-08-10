"use strict"
// @ts-check
import {messageFormErrors} from '../admin/admin.js'

/**
 * @function
 * @name Login
 * @param {Array<any>} fn 
 * @returns {HTMLDivElement} 
 */
export function LoginHTML([fn]) {
    let div = document.createElement('div')
    let message = document.createElement("div");
    message.id = "form-message";
    message.classList.add("container");
    div.appendChild(message);
    let templete= `
     <div class='container pb-5'>
        <div class="display-1 text-center"> Login</div>
        <hr class="border border-danger border-2 opacity-50">
        <form id="submitLogin" class="container pb-5">
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
                <input type="submit"  class="btn btn-danger" value="Send Login"></input>
            </div>
        </fom>
     </div>
    `
    try {
        setTimeout(()=>{
            let submitLogin = document.getElementById('submitLogin')
            //@ts-ignore: Object is possibly 'null'.
            submitLogin.addEventListener('submit',(e)=>{
                e.preventDefault()
                let data = {};
                //@ts-ignore: Object is possibly 'null'.
                let formData = submitLogin.elements;
                for (let index = 0; index < 2; index++) {
                    data[formData[index].name] = formData[index].value;
                }
                fetch(window.location.origin+'/v1-api-login',
                    {
                        body: JSON.stringify(data),
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(res => res.json())
                 .then(json => {
                    if(json.email){
                        fn({status: true, email:json.email, like:json.like, dislike:json.dislike })
                        sessionStorage.setItem("sessionAppFashion", JSON.stringify({status: true, email:json.email, like:json.like, dislike:json.dislike }))
                        //@ts-ignore: Object is possibly 'null'.
                        submitLogin.reset()
                        window.location.hash= '#'               
                    }else{
                        messageFormErrors(['Datos invalidos'], 'alert-danger')
                        //window.location.hash= '#register' 
                    }
                })
                e.stopImmediatePropagation()
            })
        },10)
    } catch (error) {
    }
    div.innerHTML += templete
    return div
}