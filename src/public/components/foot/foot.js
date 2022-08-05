export function Foot() {
    let div = document.createElement('div')
    let template = `
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