export const tareas = []; // Tipamos el arreglo de tareas con el tipo Tarea[]
export const ESTADOS = ["pendiente", "en curso", "terminada", "cancelada"];
// posibles estados de una tarea
export const DIFICULTAD = {
    1: "🌕🌑🌑 Fácil",
    2: "🌕🌕🌑 Medio",
    3: "🌕🌕🌕 Difícil",
};
// console.log("Dificultad: " + dificultadlunas(tarea.dificultad));
let id = 1; // id único
// tipado number para la variable id
// crear nueva tarea
export function crearTarea(titulo, descripcion, dificultad, vencimiento = "sin fecha") {
    const ahora = new Date();
    const tarea = {
        id: id++,
        titulo: titulo,
        descripcion: descripcion,
        dificultad: dificultad || "1",
        estado: "pendiente",
        inicioF: ahora,
        vencimiento: vencimiento || "Sin fecha"
    };
    return tarea;
}
export function guardarTarea(tarea) {
    tareas[tareas.length] = tarea;
}
export function buscarporid(id) {
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            return tareas[i];
        }
    }
    return null;
}
export function buscarporTitulo(titulo) {
    const resultados = [];
    let j = 0;
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].titulo.toLowerCase().includes(titulo.toLowerCase())) {
            resultados[j] = tareas[i];
            j++;
        }
    }
    return resultados;
}
export function obtenerestados(estado) {
    const resultados = [];
    let j = 0;
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].estado === estado) {
            resultados[j] = tareas[i];
            j++;
        }
    }
    return resultados;
}
export function obtenerTareas() {
    return tareas;
}
