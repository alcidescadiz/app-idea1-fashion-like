export function Foot() {
    let div = document.createElement('div')
    let template = `
  <p class="" ></p>
    <footer class=" bottom-0 bg-dark end-0 text-center text-white " >
      <!-- Copyright -->
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
          © 2022 Copyright:
          <p class="text-white" p>Fashion Ideas</p>
        </div>
      <!-- Copyright -->
    </footer>
    `
    div.innerHTML= template
    return div
}