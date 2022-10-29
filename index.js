const INPUT = document.querySelector(".input-text");
const BOTONAGREGAR = document.querySelector(".boton-agregar");
const FORMULARIO = document.querySelector(".form");
const LISTADETAREAS = document.querySelector(".lista-de-tareas");
const BOTONBORRARTODO = document.querySelector(".boton-borrar-todo");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

console.log(tareas);

const guardarEnLocalStorage = (LISTADETAREAS) => {
  localStorage.setItem("tareas", JSON.stringify(LISTADETAREAS));
};

const crearTarea = (tareas) => {
  `<li class="listita"> ${tareas.name}<img class="delete-btn" src="./delete.svg.svg" alt="Boton de borrar" data-name=${tareas.name}></li>`;
};

const renderizarLista = (todolist) => {
  LISTADETAREAS.innerHTML = todolist
    .map((tareas) => crearTarea(tareas))
    .join("");
};

const ocultarBorrarTodo = (LISTADETAREAS) => {
  if (!LISTADETAREAS.length) {
    BOTONBORRARTODO.classList.add("hidden");
    return;
  }
  BOTONBORRARTODO.classList.remove("hidden");
};

const agregarTarea = (evento) => {
  evento.preventDefault();
  const nombreDeTarea = INPUT.value.trim().replace(/\s+/g, " ");

  if (!nombreDeTarea.length) {
    alert("Por favor, ingrese una tarea");
    return;
  } else if (
    tareas.some(
      (tareas) => tareas.name.toLowerCase() === nombreDeTarea.toLowerCase()
    )
  ) {
    alert("Ya existe una tarea con ese nombre");
    return;
  }

  tareas = [...tareas, { name: nombreDeTarea }];
  INPUT.value = "";
  renderizarLista(tareas);
  guardarEnLocalStorage(tareas);
  ocultarBorrarTodo(tareas);
};

const borrarTarea = (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const filtrarPorNombre = e.target.dataset.name;

  tareas = tareas.filter((tarea) => tarea.name !== filtrarPorNombre);
  renderizarLista(tareas);
  guardarEnLocalStorage(tareas);
  ocultarBorrarTodo(tareas);
};

const borrarTodo = () => {
  tareas = [];
  renderizarLista(tareas);
  guardarEnLocalStorage(tareas);
  ocultarBorrarTodo(tareas);
};

const init = () => {
  renderizarLista(tareas);
  FORMULARIO.addEventListener("submit", agregarTarea) ||
    BOTONAGREGAR.addEventListener("clic", agregarTarea);
  LISTADETAREAS.addEventListener("click", borrarTarea);
  BOTONBORRARTODO.addEventListener("click", borrarTodo);
  ocultarBorrarTodo(tareas);
};

init();
