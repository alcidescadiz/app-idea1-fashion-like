import {useGenerateTableCRUD} from '../../modules/CRUDgenerator.js'
let {
  componentTable,
  getModal,
  inicialArrayObjects,
  RenderTable,
  setObjectInArray,
  eventForm,
  getData,
  eventFormEdit,
  getIdDataEdit
} = useGenerateTableCRUD();

//-- 1ro exportar componente
export { componentTable as Admin};

//-- 2do
//  --> id del formulario 'string',
//  --> titulo del modal
//  --> {campos} y tipo de campos: 'text' 'number' 'password' 'color' 'date' 'email', 'select'[]
// activar modal de ingreso y actualizar
getModal('formulario', 'Form Modal',{ 
  id: "text", 
  post: "text",
  date:"text",
  img: "text",
  voto:["select", ['like', 'dislike']] // select
});
/**
 * -- 3ro
 * Estado inicial dela base de datos-- USAR ESTA PARA EL FECTH
 */

 window.addEventListener("hashchange", (e) => {
   if (window.location.hash=== '#admin' ){
       fetch(window.location.origin+'/v1-api-post',
       {
           method:'GET',
           headers:{
               'Content-Type': 'application/json'
           }
       }
       ).then(res => res.json())
        .then(json => {
          inicialArrayObjects(json.posts)
      })
   }
});


/**
 * Acciones crud:
 *   setArrayObjects({ value: getData(), mode: "add" })    // add
 *   setArrayObjects({ value: getData(), mode: "update" }) // update
 *   setArrayObjects({ mode: "delete", id });              // delete
 */

//-- crear eventos de ver-eliminar-añadir--EJEMPLOS:
//-- agregar en cada caso la logica adicional de la base de datos
document.addEventListener("submit", (e) => {
    // añadir - add
    e.preventDefault();
    try {
      if (document.querySelector("#action-form-add").style.display === "block") {
         /**
         * logica de add de base de datos
         */
        if(confirm('Desea agregar datos?')){
          eventForm();
          fetch(window.location.origin+'/v1-api-post',
          {
              body: JSON.stringify(getData()),
              method:'POST',
              headers:{
                  'Content-Type': 'application/json'
              }
          }
      ).then(res => {
          if(res.statusText === 'OK'){
              document.getElementById('submitRegister')?.reset()
              //window.location.hash= '#'
              console.log('agregado con exito el feth')
              setObjectInArray({ value: getData(), mode: "add" });
              RenderTable();
          }
      })

        }
      }
      //--- editar - edit---
      if (document.querySelector("#action-form-edit").style.display === "block") {
         /**
         * logica de edit de base de datos
         */
        if(confirm('Desea editar los datos?')){
          console.log('editando')
          eventFormEdit();
          setObjectInArray({
            value: getIdDataEdit().data,
            mode: "update",
            id: Number(getIdDataEdit().id),
          });
          RenderTable();
        }
      }
    } catch (error) {
      
    }
  });
  
  document.addEventListener("click", (e) => {
    //--- eliminar - delete ---
    if (e.target.innerHTML === "Delete") {
      /**
       * logica de delete de base de datos
       */
      if(confirm('Desea eliminar datos?')){
        let id = Number(e.target.parentNode.parentNode.childNodes[0].innerHTML);
        setObjectInArray({ mode: "delete", id });
        RenderTable();
      }
    }


  });