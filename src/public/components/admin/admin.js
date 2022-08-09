"use strict";
// @ts-check

import { useGenerateTableCRUD } from "../../modules/CRUDgenerator.js";
import { inicialArrayObjectsGallery } from "../gallery/gallery.js";
let {
  getArrayObjects,
  componentTable,
  getModal,
  inicialArrayObjects,
  RenderTable,
  setObjectInArray,
  eventForm,
  getData,
  eventFormEdit,
  getIdDataEdit,
  TopTenTemplate
} = useGenerateTableCRUD();

//-- 1ro exportar componente
export { componentTable as Admin };

//-- 2do
//  --> id del formulario 'string',
//  --> titulo del modal
//  --> {campos} y tipo de campos: 'text' 'number' 'password' 'color' 'date' 'email', 'select'[]
// activar modal de ingreso y actualizar
getModal("formulario", "Form Modal", {
  id: "text",
  post: "text",
  img: "text",
  date: "text",
});
/**
 * -- 3ro
 * Estado inicial dela base de datos-- USAR ESTA PARA EL FECTH
 */

window.addEventListener("hashchange", (e) => {
  if (window.location.hash === "#admin") {
    fetch(window.location.origin + "/v1-api-post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        inicialArrayObjects(json.posts);
        TopTenTemplate(json.topTenPost)
      });
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
    //@ts-ignore: Object is possibly 'null'.
    if (document.querySelector("#action-form-add").style.display === "block") {
      /**
       * logica de add de base de datos
       */
      if (confirm("Desea agregar datos?")) {
        eventForm();
        fetch(window.location.origin + "/v1-api-post", {
          body: JSON.stringify(getData()),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.statusText === "OK") {
            //@ts-ignore: Object is possibly 'null'.
            document.getElementById("submitRegister")?.onreset();
            setObjectInArray({ value: getData(), mode: "add", id: null });
            RenderTable();
          }
        });
      }
    }
    //--- editar - edit---
    //@ts-ignore: Object is possibly 'null'.
    if (document.querySelector("#action-form-edit").style.display === "block") {
      /**
       * logica de edit de base de datos
       */
      if (confirm("Desea editar los datos?")) {
        console.log("editando");
        eventFormEdit();
        fetch(window.location.origin + `/v1-api-post/${getIdDataEdit().id}`, {
          body: JSON.stringify(getIdDataEdit()),
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.statusText === "OK") {
            //@ts-ignore: Object is possibly 'null'.
            document.getElementById("submitRegister")?.onreset();
            setObjectInArray({
              value: getIdDataEdit().data,
              mode: "update",
              id: getIdDataEdit().id,
            });
            inicialArrayObjectsGallery(getArrayObjects())
            RenderTable();
          }
        });
        e.stopImmediatePropagation()
      }
    }
  } catch (error) {}
});

document.addEventListener("click", (e) => {
  //--- eliminar - delete ---
  //@ts-ignore: Object is possibly 'null'.
  if (e.target.innerHTML === "Delete") {
    /**
     * logica de delete de base de datos
     */
    if (confirm("Desea eliminar datos?")) {
      //@ts-ignore: Object is possibly 'null'.
      let id = e.target.parentNode.parentNode.childNodes[0].innerHTML;
      fetch(window.location.origin + `/v1-api-post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res)
        if (res.statusText === "OK") {
          //@ts-ignore: Object is possibly 'null'.
          setObjectInArray({ value: null, mode: "delete", id });
          inicialArrayObjectsGallery(getArrayObjects())
          RenderTable();
        }
      });
    }
  }
});
