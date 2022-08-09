"use strict"
// @ts-check

import { useGenerateGalleryCard } from "./GalleryGenerator.js";
let { componentGallery, inicialArrayObjects, RenderGallery,setObjectInArray } =
  useGenerateGalleryCard();

//-- 1ro exportar componente
export { componentGallery as Gallery, inicialArrayObjects as inicialArrayObjectsGallery,RenderGallery  };

/**
 * -- 2do
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

