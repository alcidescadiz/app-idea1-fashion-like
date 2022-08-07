import { useGenerateGalleryCard } from "./GalleryGenerator.js";
let { componentTable, inicialArrayObjects, RenderTable, setObjectInArray } =
  useGenerateGalleryCard();

//-- 1ro exportar componente
export { componentTable as Gallery };

/**
 * -- 3ro
 * Estado inicial dela base de datos-- USAR ESTA PARA EL FECTH
 */

fetch(window.location.origin + "/v1-api-post", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log("render galeria");
    inicialArrayObjects(json.posts);
  });


/**
 * Acciones crud:
 *   setArrayObjects({ value: getData(), mode: "add" })    // add
 *   setArrayObjects({ value: getData(), mode: "update" }) // update
 *   setArrayObjects({ mode: "delete", id });              // delete
 */

//-- crear eventos de --like y dislike--EJEMPLOS

document.addEventListener("click", (e) => {
  //--- eliminar - delete ---
  if (e.target.innerHTML === "Delete") {
    /**
     * logica de delete de base de datos
     */
    //if(confirm('Desea eliminar datos?')){
    let id = Number(e.target.parentNode.parentNode.childNodes[0].innerHTML);
    setObjectInArray({ mode: "delete", id });
    RenderTable();
    //}
  }
});
