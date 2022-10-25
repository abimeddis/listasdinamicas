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
  `<li> ${tareas.name}<img class="delete-btn" src="./delete.sv.svg" alt="Boton de borrar" data-id=${tareas.tareaId}></li>`;
};

const renderizarLista = (todoList) => {
  LISTADETAREAS.innerHTML = todoList
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
  const nombreDeTarea = INPUT.value.trim();

  if (!nombreDeTarea.length) {
    alert("Por favor, ingrese una tarea");
    return;
  } else if (
    tareas.some(
      (tarea) => tarea.name.toLowerCase() === nombreDeTarea.toLowerCase()
    )
  ) {
    alert("Ya existe una tarea con ese nombre");
    return;
  }

  tareas = [...tareas, { name: nombreDeTarea, tareaId: tareas.length + 1 }];
  INPUT.value = "";
  renderizarLista(tareas);
  guardarEnLocalStorage(tareas);
  ocultarBorrarTodo(tareas);
};

const borrarTarea = (e) => {
  if (!e.target.classList.contains("delete-btn")) return;
  const filterId = Number(e.target.dataset.id);
  tareas = tareas.filter((tarea) => tarea.tareasId !== filterId);
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
