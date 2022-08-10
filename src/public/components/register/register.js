"use strict"
// @ts-check 
import {messageFormErrors} from '../admin/admin.js'
/**
 * @function
 * @name Register
 * @return {HTMLDivElement} 
 */
export function Register() {
    let div = document.createElement('div')
    let message = document.createElement("div");
    message.id = "form-message";
    message.classList.add("container");
    div.appendChild(message);
    let templete= `
     <div class='container pb-5'>
        <div class="display-1 text-center"> Register</div>
        <hr class="border border-danger border-2 opacity-50">
        <form id="submitRegister" class="container pb-5">
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
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label"></label>
                <label class="col-sm-10">
                    <i>
                     La contraseña debe ser entre 8-15 caracteres, poseer al menos una mayuscula, un número, un caracter especial de estos: $@$!%*?&
                    </i>
                </label>

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
            let submitRegister = document.getElementById('submitRegister')
            if (submitRegister !== null){
                submitRegister.addEventListener('submit',(e)=>{
                    e.preventDefault()
                    let data = {};
                    //@ts-ignore: Object is possibly 'null'.
                    let formData = submitRegister.elements
                    for (let index = 0; index < 4; index++) {
                        data[formData[index].name] = formData[index].value;
                    }
                    fetch(window.location.origin+'/v1-api-register',
                        {
                            body: JSON.stringify(data),
                            method:'POST',
                            headers:{
                                'Content-Type': 'application/json',
                                "x-access-token": "yfkuyfu"
                            }
                        }
                    ).then(res => res.json())
                     .then(json =>{
                        if(json.msg){
                            //@ts-ignore: Object is possibly 'null'.
                            submitRegister.reset()
                            messageFormErrors([json.msg])
                            alert('Ya puede iniciar sesión!!')
                            window.location.hash= '#login'
                        }
                        if(json.error){
                            messageFormErrors(json.error, 'alert-danger')
                        }
                    })
                 e.stopImmediatePropagation()
                })
            }
        },10)
    } catch (error) {
    }
    div.innerHTML += templete
    return div
}