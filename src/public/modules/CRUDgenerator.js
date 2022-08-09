"use strict"
// @ts-check

export let useGenerateTableCRUD = function () {
  //---- gestionar array de post----//
  /**@type {array} */
  let save = [];
  let inicialArrayObjects = (array)=>  save = array.map((e) => ({id: e.id, post:e.post,img:e.img, date:e.date}))||[];
  let getArrayObjects = () => save.sort((e, p) => e.id - p.id);
  let setObjectInArray = ({ value, mode, id }) => {
    try {
      if (mode === "add") {
        if (value.id === "" || value.id === NaN || value.id === undefined) {
          value.id =
            typeof save[save.length - 1]?.id === "number"
              ? save[save.length - 1]?.id + 1
              : save.length + 1;
          save.push({ id: value.id, ...value });
        } else {
          value.id =
            typeof (value.id) === "number"
              ? value.id
              : save.length + 1;
          save.push({ id: value.id, ...value });
        }
      }
      if (mode === "delete") {
          save = save.filter((e) => e.id !== id)
          messageForm( 'Elemento eliminado satisfactoriamente', 'alert-primary' )
      };
      if (mode === "update") {
        save = save.map((e) => {
          if (e.id === id) {
            return {
              id: e.id,
              ...value,
            };
          }
          return e;
        });
      }
    } catch (error) {
    }
  };
  //-------- gestion del modal--------//
  /**@type {HTMLDivElement} */
  let templeteArray;
  let modal = ``;
  let idForm = '';
  let getTable = () => templeteArray;
  let getModal = (id,titulo, prototype) => {
    idForm = id
    let typeModel = Object.entries(prototype)
      .map((e) => {
        let inputForm = ``
        if(e[1][0] === 'select'){
          let optionSelect = e[1][1].map(e=> `<option value="${e}">${e}</option>`).join('')
          inputForm =  `
            <select  class ="form-select" id="${e[0]}form"  name="${e[0]}">   
              ${optionSelect}
            </select>
          `
        }else{
          inputForm =  `
          <input  class ="form-control" id="${e[0]}form"  name="${e[0]}"  type="${e[1]}"  
            autocomplete="off">${""}
          </input>
        `
        }
        return `
        <div>
          <label class="form-label">${e[0].toUpperCase()} </label>
          ${inputForm}
        </div>`;
      })
      .join("");

    modal = `
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">${titulo} </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
                <form class="formModal  mb-3 " id="formulario">
                  <div class="modal-body">
                    ${typeModel}
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="accion-close-modal"  data-bs-dismiss="modal" >Close</button>
                    <input type="submit" class="btn btn-primary" id="action-form-add" data-bs-dismiss="modal" value="Add" />
                    <input type="submit" class="btn btn-primary" id="action-form-edit" data-bs-dismiss="modal" value="Edit" />
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
        `;
  };
  let setTempleteArray = (array, tableClass = "container align-middle table pb-5 ") => {
    try {
      let div = document.createElement("div");
      //@ts-ignore: Object is possibly 'null'.
      div.classList ='table-responsive pb-2'
      let table = document.createElement("table");
      let createTable =
        '<button type="button" class="d-flex btn btn-outline-primary btn-lg m-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create</button>';
      div.innerHTML += createTable;
      //@ts-ignore: Object is possibly 'null'.
      table.classList = tableClass;
      if (array.length < 1) {
        div.innerHTML += modal;
        return (templeteArray = div);
      }
      let headers =
        `<thead><tr class="" style="width:100px">` +
        Object.entries(array[0])
          .map((e) => `<th class="tdth">${e[0].toUpperCase()}</th>`)
          .join("") +
        "<th class='text-center ' style='width: 150px;'>ACCIONS</th></tr></thead>";
      let view =
        '<button type="button" class="btn btn-primary edit m-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">View</button>';
      let accions = `<td class='text-center' >${view}<button class='btn btn-danger delete m-1' >Delete</button></td>`;
      let renderTable =
        `<tbody class="table-group-divider">` +
        array
          .map((e) => {
            return (
              "<tr class=''>" +
              Object.entries(e)
                .map((e) => `<td class="tdth">${e[1]}</td>`)
                .join(" ") +
              accions +
              "</tr>"
            );
          })
          .join("") +
        "</tbody>";
      table.innerHTML = headers + renderTable;
      div.appendChild(table);
      return (templeteArray = div);
    } catch (error) {
    }
  };

  //-- funcion y componente tabla
  function RenderTable() {
    // inicializar tabla
    try {
      setTimeout(() => {
        setTempleteArray(getArrayObjects())
        //@ts-ignore: Object is possibly 'null'.
        document.getElementById("tabla").replaceChildren(getTable());
      }, 10);
    } catch (error) {
    }
  }
  /**
 * @function
 * @name componentTable
 * @returns {HTMLDivElement} 
 */
  function componentTable([fn]) {
      let div = document.createElement("div");
      if(fn().email !== 'admin@mail.com') return div
      //@ts-ignore: Object is possibly 'null'.
      div.classList = "container pb-5";
      let divTopTen = document.createElement("div");
      divTopTen.id= "div-top-ten"
      div.appendChild(divTopTen);
      let message = document.createElement("div");
      message.id = "form-message";
      message.classList.add("cotainer");
      div.appendChild(message);
      let tabla = document.createElement("div");
      tabla.id = "tabla";
      div.appendChild(tabla);
      let divModal = document.createElement("div");
      divModal.innerHTML = modal
      div.appendChild(divModal);
      RenderTable();
      function CleanForm(){
        //@ts-ignore: Object is possibly 'null'.
        document.getElementById(idForm)?.reset();
      }
      //--- eventos---
      document.addEventListener("click", (e) => {
        //@ts-ignore: Object is possibly 'null'.
          if (e.target.innerHTML === "Create") {
            CleanForm()
            RenderTable();
            //@ts-ignore: Object is possibly 'null'.
            document.getElementById("action-form-edit").style.display = 'none';
            //@ts-ignore: Object is possibly 'null'.
            document.getElementById("action-form-add").style.display = "block";
          }
          //@ts-ignore: Object is possibly 'null'.
          if (e.target.innerHTML === "Close") {
            CleanForm()
            //@ts-ignore: Object is possibly 'null'.
            document.getElementById("action-form-add").style.display = "none";
            //@ts-ignore: Object is possibly 'null'.
            document.getElementById("action-form-edit").style.display = 'none';
          }
          //@ts-ignore: Object is possibly 'null'.
          if (e.target.innerHTML === "View") {
            CleanForm()
            RenderTable();
            //@ts-ignore: Object is possibly 'null'.
            document.getElementById("action-form-edit").style.display = 'block';
            //@ts-ignore: Object is possibly 'null'.
            document.getElementById("action-form-add").style.display = "none";
            //@ts-ignore: Object is possibly 'null'.
            let id = e.target.parentNode.parentNode.childNodes[0].innerHTML
            let data = save.filter((e) => e.id === id);
            Object.entries(data[0]).map((e) => {
              //@ts-ignore: Object is possibly 'null'.
              document.getElementsByName(e[0])[0].value = e[1];
            });
          }
        });
      return div;
  }
  //----- acciones del form----------//
  let data = {};
  let getData = () => data;
  let dataEdit = {};
  function getIdDataEdit() {
    return dataEdit;
  }
  function messageForm(params, type = 'alert-success') { 
    //@ts-ignore: Object is possibly 'null'.
    document.getElementById('form-message').innerHTML=`
    <div class="alert ${type} alert-dismissible fade show fixed-top" role="alert">
      <strong>${params}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
    setTimeout(()=>{
      //@ts-ignore: Object is possibly 'null'.
      document.getElementById('form-message').innerHTML=``
    },5000)
  }
  let eventForm = function (msg) { 
    //@ts-ignore: Object is possibly 'null'.
    let formData = document.getElementById(idForm).elements;
    for (let index = 0; index < formData.length; index++) {
      if (formData[index].name) {
        data[formData[index].name] = formData[index].value;
      }
    }
    //@ts-ignore: Object is possibly 'null'.
    document.getElementById(idForm).reset();
    messageForm( msg || 'Elemento añadido satisfactoriamente')
  };
  let eventFormEdit = function (msg) {
    try {
      //@ts-ignore: Object is possibly 'null'.
      let formData = document.getElementById(idForm).elements;
      for (let index = 0; index < formData.length - 2; index++) {
        if (formData[index]?.name === "id") {
          dataEdit.id = formData[index].value;
          dataEdit.data = {
            ...dataEdit.data,
            [formData[index].name]: formData[index].value
          };
        } else if (formData[index]?.name !== "") {
          dataEdit.data = {
            ...dataEdit.data,
            [formData[index].name]: formData[index].value,
          };
        }
      }
      messageForm( msg || 'Elemento editado satisfactoriamente')
      return dataEdit;
    } catch (error) {
    }
  };
  let TopTenTemplate = (topTenArray)=>{
    let templateTopLike = ``
    let templateTopDisLike = ``
    save.map((e,i)=> {
      topTenArray.like.map(p=>{
        if (p[0] === e.id){
          templateTopLike+= `          
          <div class="overflow-hidden text-center m-1 border">
            <div class="row gx-5">
              <div class="col" >
                <div class="border bg-light" >
                  <img src="${e.img}" width="50px">
                </div>
              </div>
              <div class="col position-relative bg-light">
                <div class="position-absolute top-50 start-50 translate-middle">
                  <p>${p[1]}</p>
                </div>
              </div>
            </div>
          </div>
          `
        }
      })
      topTenArray.dislike.map(p=>{
        if (p[0] === e.id){
          templateTopDisLike+= `          
          <div class="overflow-hidden text-center m-1 border">
            <div class="row gx-5">
              <div class="col" >
                <div class=" border bg-light" >
                  <img src="${e.img}" width="50px">
                </div>
              </div>
              <div class="col position-relative bg-light">
                <div class="position-absolute top-50 start-50 translate-middle">
                  <p>${p[1]}</p>
                </div>
              </div>
            </div>
          </div>
          `
        }
      })
    })
    let templateTop =`
    <div class="container m-1">
        <div class="text-center bg-light">
          <h3> Top Fashion Like</h3>
        </div>
          ${templateTopLike}
        <div class="text-center bg-light">
          <h3> Top Fashion disLike</h3>
        </div>    
          ${templateTopDisLike}
    </div>
    `
    //@ts-ignore: Object is possibly 'null'.
    document.getElementById("div-top-ten").innerHTML = templateTop
  }
  return {
    inicialArrayObjects,
    getArrayObjects,
    setObjectInArray,
    getModal,
    RenderTable,
    componentTable,
    eventForm,
    getData,
    eventFormEdit,
    getIdDataEdit,
    TopTenTemplate
  };
};
