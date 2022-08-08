"use strict"
// @ts-check

/**
 * @function
 * @name Foot
 * @returns {HTMLDivElement} 
 */
export function Foot() {
    let div = document.createElement('div')
    /**@type {string} */
    let template = `
    <br>
    <br>
    <footer class="bg-dark  text-center text-white " >
      <!-- Copyright -->
        <div class=" p-3" style="background-color: rgba(0, 0, 0, 0.2);">
          © 2022 Copyright:
          <p>Fashion Ideas</p>
        </div>
      <!-- Copyright -->
    </footer>
    `
    div.innerHTML= template
    return div
}