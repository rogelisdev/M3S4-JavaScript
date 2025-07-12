console.log("Bienvenidos");

//The element with id "app" is where the dynamic content will be displayed
const app = document.querySelector("#app");

// Function to render the home page
async function renderInicio() {
  app.innerHTML = `
    <section class='inicio'>
      <h1>Bienvenido a mi entrenamiento M3S4</h1>
      <br>
      <button id="iniciar">Iniciar</button>
    </section>
  `;

  document.getElementById("iniciar").addEventListener("click", renderFormulario);
}

// Function to render the form and handle events
async function renderFormulario() {
  app.innerHTML = `
    <section id='container'>
      <h2>Completa la siguiente informacion</h2>
      <div id='formulario'>
        <form id='form'>
          <label for='name'>Nombre:</label><br>
          <input type='text' id='name' required placeholder='Escriba su nombre'><br>
          <label for='age'>Edad:</label><br>
          <input type='text' id='age' required placeholder='Escriba su edad'><br>
          <button type='submit'>Enviar</button><br>
          <button type='button' id='limpiar'>Limpiar</button>
        </form>
      </div>
      <div id='usuarios'>
        <h3>Usuarios Registrados (<span id="contador-usuarios">0</span>)</h3>
        <ul id='lista-usuarios'></ul>
      </div>
      <div id='vaciar'>
      <button type='button' id='clearlist'>Borrar lista</button>
      </div>
    </section>`;
// We select the DOM elements
  const $form = document.getElementById("form");
  const $btnLimpiar = document.getElementById("limpiar");

// Event to clear form
  $btnLimpiar.addEventListener("click", (e) => {
    e.preventDefault();
    $form.reset();
    console.log("Formulario limpiado");
  });

 // Submit event to save user without duplicates
  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const $nombre = document.getElementById("name").value.trim();
    const $edad = document.getElementById("age").value.trim();

    if ($nombre && $edad) {
      const usuarios = JSON.parse(localStorage.getItem("users")) || [];

    // Validate that the user does not exist
      const existeUsuario = usuarios.some(
        (usuario) => usuario.name.toLowerCase() === $nombre.toLowerCase()
      );

      if (existeUsuario) {
        alert("El usuario ya está registrado");
        return;
      }
// Create new user and save it
      const nuevoUsuario = { name: $nombre, age: $edad };
      usuarios.push(nuevoUsuario);
      localStorage.setItem("users", JSON.stringify(usuarios));
      console.log(`Usuarios registrados: ${$nombre}, Edad: ${$edad}`);

      renderUsuarios(); // update list
      $form.reset();
    } else {
      alert("Por favor, completa todos los campos.");
      console.log("Por favor, completa todos los campos.");
    }
  });
  clearList();
  renderUsuarios();
}

// Function to display stored users
function renderUsuarios() {
    const contadorUsuarios = document.getElementById("contador-usuarios");
  const listaUsuarios = document.getElementById("lista-usuarios");
  listaUsuarios.innerHTML = "";

  const usuarios = JSON.parse(localStorage.getItem("users")) || [];
  contadorUsuarios.textContent = usuarios.length;

  if (usuarios.length === 0) {
    listaUsuarios.innerHTML = "<li>No hay usuarios registrados</li>";
    return;
  }
// Iterate over users and create list items
  usuarios.forEach((usuario) => {
    const li = document.createElement("li");
    li.textContent = `Hola: ${usuario.name}, Tienes ${usuario.age} años.`;
    listaUsuarios.appendChild(li);
  });
}
// Function to clear the user list
async function clearList() {
 const btnVaciar = document.getElementById("clearlist");
  if (!btnVaciar) return; 

  btnVaciar.addEventListener("click", () => {
    localStorage.removeItem("users"); 
    renderUsuarios();
    console.log("Lista de usuarios borrada");
  });
}


// Initialize the application when the DOM is loaded
window.addEventListener("DOMContentLoaded", renderInicio);
