// Clase para manejar tareas
class Tarea {
  constructor(nombre) {
    this.nombre = nombre;
    this.completada = false;
  }

  // Método para marcar una tarea como completada
  marcarCompletada() {
    this.completada = true;
  }

  // Método para obtener el estado de la tarea
  obtenerHTML() {
    return `
        <span style="text-decoration: ${this.completada ? 'line-through' : 'none'};">
          ${this.nombre}
        </span>
      `;
  }
}

// Clase para manejar la lista de tareas
class ListaTareas {
  constructor() {
    this.tareas = [];
  }

  // Método para agregar una tarea
  agregarTarea(tarea) {
    this.tareas.push(tarea);
    this.renderizarTareas();
  }

  // Método para eliminar una tarea
  eliminarTarea(indice) {
    this.tareas.splice(indice, 1);
    this.renderizarTareas();
  }

  // Método para renderizar las tareas en el DOM
  renderizarTareas() {
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = "";

    this.tareas.forEach((tarea, indice) => {
      const tareaDiv = document.createElement("div");
      tareaDiv.className = "tarea";
      tareaDiv.innerHTML = `
      ${tarea.obtenerHTML()}
      <button onclick="lista.eliminarTarea(${indice})">Eliminar</button>
    `;
      listaTareas.appendChild(tareaDiv);
    });
  }
}

// Crear una instancia de la lista de tareas
const lista = new ListaTareas();

// Manejar eventos de la página
document.getElementById("agregarBtn").addEventListener("click", () => {
  const tareaInput = document.getElementById("tareaInput");
  const nombreTarea = tareaInput.value.trim();

  if (nombreTarea) {
    const nuevaTarea = new Tarea(nombreTarea);
    lista.agregarTarea(nuevaTarea);
    tareaInput.value = ""; // Limpiar el campo de texto
  }
});
