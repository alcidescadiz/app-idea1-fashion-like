import { useGenerateGalleryCard } from "./GalleryGenerator.js";
let { componentTable, inicialArrayObjects, RenderGallery } =
  useGenerateGalleryCard();

//-- 1ro exportar componente
export { componentTable as Gallery, RenderGallery };

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
    inicialArrayObjects(json.posts);
  });

