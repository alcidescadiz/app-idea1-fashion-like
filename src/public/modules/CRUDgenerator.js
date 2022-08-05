export let useGenerateTableCRUD = function () {
  //---- gestionar array de objetos----//
  let save = [];
  let inicialArrayObjects = (array)=>  save = array.map((e) => {return {id: e.id, ...e}});
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
  let templeteArray = ``;
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
  let setTempleteArray = (array, tableClass = "container table") => {
    try {
      let div = document.createElement("div");
      let table = document.createElement("table");
      let createTable =
        '<button type="button" class="d-flex btn btn-outline-primary btn-lg m-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create</button>';
      div.innerHTML += createTable;
      table.classList = tableClass;
      if (array.length < 1) {
        div.innerHTML += modal;
        return (templeteArray = div);
      }
      let headers =
        `<thead><tr>` +
        Object.entries(array[0])
          .map((e) => `<th>${e[0].toUpperCase()}</th>`)
          .join("") +
        "<th class='text-center' >ACCIONS</th></tr></thead>";
      let view =
        '<button type="button" class="btn btn-primary edit m-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">View</button>';
      let accions = `<td class='text-center'>${view}<button class='btn btn-danger delete m-1' >Delete</button></td>`;
      let renderTable =
        `<tbody class="table-group-divider">` +
        array
          .map((e) => {
            return (
              "<tr>" +
              Object.entries(e)
                .map((e) => `<td>${e[1]}</td>`)
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
        document.getElementById("tabla").replaceChildren(getTable());
      }, 10);
    } catch (error) {
    }
  }
  // componente html
  function componentTable() {
    try {
      let div = document.createElement("div");
      div.classList = "container";
      let message = document.createElement("div");
      message.id = "form-message";
      message.classList = "container";
      div.appendChild(message);
      let tabla = document.createElement("div");
      tabla.id = "tabla";
      div.appendChild(tabla);
      let divModal = document.createElement("div");
      divModal.innerHTML = modal
      div.appendChild(divModal);
      RenderTable();
      function CleanForm(){
        //divModal.innerHTML = ``
        //modal = ``
        document.getElementById(idForm)?.reset();
      }
      //--- eventos---
      document.addEventListener("click", (e) => {
          if (e.target.innerHTML === "Create") {
            CleanForm()
            RenderTable();
            document.getElementById("action-form-edit").style.display = 'none';
            document.getElementById("action-form-add").style.display = "block";
          }
          if (e.target.innerHTML === "Close") {
            CleanForm()
            document.getElementById("action-form-add").style.display = "none";
            document.getElementById("action-form-edit").style.display = 'none';
          }
          if (e.target.innerHTML === "View") {
            CleanForm()
            RenderTable();
            document.getElementById("action-form-edit").style.display = 'block';
            document.getElementById("action-form-add").style.display = "none";
            let id = e.target.parentNode.parentNode.childNodes[0].innerHTML
            let data = save.filter((e) => e.id === id);
            Object.entries(data[0]).map((e) => {
              document.getElementsByName(e[0])[0].value = e[1];
            });
          }
        });
      return div;
    } catch (error) { 
    }
  }
  //----- acciones del form----------//
  let data = {};
  let getData = () => data;
  let dataEdit = {};
  function getIdDataEdit() {
    return dataEdit;
  }
  function messageForm(params, type = 'alert-success') { 
    document.getElementById('form-message').innerHTML=`
    <div class="alert ${type} alert-dismissible fade show fixed-top" role="alert">
      <strong>${params}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
    setTimeout(()=>{
      document.getElementById('form-message').innerHTML=``
    },5000)
  }
  let eventForm = function (msg) { 
    let formData = document.getElementById(idForm).elements;
    for (let index = 0; index < formData.length; index++) {
      if (formData[index].name) {
        data[formData[index].name] = formData[index].value;
      }
    }
    document.getElementById(idForm).reset();
    messageForm( msg || 'Elemento añadido satisfactoriamente')
  };
  let eventFormEdit = function (msg) {
    try {
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
      document.getElementById(idForm).reset();
      messageForm( msg || 'Elemento editado satisfactoriamente')
      return dataEdit;
    } catch (error) {
    }
  };
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
    getIdDataEdit
  };
};
