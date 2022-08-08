"use strict"
// @ts-check

export let useGenerateGalleryCard = function () {
  //---- gestionar array de objetos----//
  /**@type {array} */
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
            typeof Number(value.id) === "number"
              ? Number(value.id)
              : save.length + 1;
          save.push({ id: value.id, ...value });
        }
      }
      if (mode === "delete") {
          save = save.filter((e) => e.id !== id)
      };
      if (mode === "update") {
        save = save.map((e) => {
          if (e.id === id) {
            return {
              id: Number(e.id),
              ...value,
            };
          }
          return e;
        });
      }
    } catch (error) {
    }
  };
  //-------- gestion del template--------//
  /**@type {HTMLElement} */
  let templeteArray;
    /**@type {string} */
  let templateLike= `
                <div class="position-absolute top-0 end-0 m-2">
                    <span class="badge rounded-pill text-bg-success">Favorite</span>
                </div>`
  /**@type {string} */
  let templateDislike= `
                <div class="position-absolute top-0 end-0 m-2">
                    <span class="badge rounded-pill text-bg-danger">Disapprove</span>
                </div>`
  let getTable = () => templeteArray;
  let setTempleteArray = (array,like = [], dislike=[], tableClass = "container table") => {
    try {
      let div = document.createElement("div");
      let table = document.createElement("div");
      //@ts-ignore: Object is possibly 'null'.
      table.classList = tableClass;
      if (array.length < 1) {
        return (templeteArray = div);
      }
      let renderTable =
        ` <div class='container pb-5'>
            <div class="g-2 pb-4">` +
        array
          .map((e) => {
            return (
              `<div class="card m-3" style="max-width: 100%;"><div class="row g-0">` +
              `                        <div class="col-md-4">
              <img src=${e.img} class="img-fluid rounded-start w-100" alt="...">
          </div>
          <div class="col-md-8">
              <div class="position-relative bottom-0 start-0 m-2">
                  <span class="badge rounded-pill text-bg-secondary">${e.date}</span>
              </div>
              <div class="card-body" >
                <div id=${e.id}>
                  ${like.includes(e.id)? templateLike: ''}
                  ${dislike.includes(e.id)? templateDislike: ''}
                </div>
              <h5 class="card-title">${e.post}</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
              <br>
              <br>
              <div class="position-absolute bottom-0 end-0 m-2">
                  <button name=${e.id} class="btn btn-primary me-md-2" type="button">Like</button>
                  <button name=${e.id} class="btn btn-warning" type="button">Dislike</button>
              </div>
          </div>` +
              
              "</div></div>"
            );
          })
          .join("") +
        "</div></div>";
      table.innerHTML =  renderTable;
      div.appendChild(table);
      return (templeteArray = div);
    } catch (error) {
    }
  };

  //-- renderizar la galeria
  /**
   * @param {Array<string>} like 
   * @param {Array<string>} dislike 
   */
  function RenderGallery(like=[], dislike=[]) {
    // inicializar tabla
    try {
      setTimeout(() => {
        setTempleteArray(getArrayObjects(), like, dislike)
        //@ts-ignore: Object is possibly 'null'.
        document.getElementById("div-galeria").replaceChildren(getTable());
      }, 10);
    } catch (error) {
    }
  }

  /**
  * @function
  * @name componentGallery
  * @param {Array<any>} fn 
  * @returns {HTMLDivElement} 
  */
  function componentGallery([fn]) {
    const {like, dislike} = fn()
      let div = document.createElement("div");
      //@ts-ignore: Object is possibly 'null'.
      div.classList = "container";
      let message = document.createElement("div");
      message.id = "form-message";
      //@ts-ignore: Object is possibly 'null'.
      message.classList = "container";
      div.appendChild(message);
      let tabla = document.createElement("div");
      tabla.id = "div-galeria";
      div.appendChild(tabla);
      RenderGallery(like, dislike);
      return div;

  }
  
  return {
    inicialArrayObjects,
    getArrayObjects,
    setObjectInArray,
    RenderGallery,
    componentGallery
  };
};

