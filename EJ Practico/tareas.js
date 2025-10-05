// tareas.js
import PromptSync from "prompt-sync";
import { obtenerTareas, obtenerestados } from "./data.js";

const prompt = PromptSync();








// ingresar nueva tarea
export function ingresarDatos() {
    console.log("========= AGREGAR TAREA ==========");

    let titulo = prompt("Ingrese el título de la tarea: ").trim();
    while (titulo === "") {
        console.log("⚠️ El título no puede estar vacío.");
        titulo = prompt("Ingrese el título de la tarea: ").trim();
    }

    let descripcion = prompt("Ingrese la descripción de la tarea: ").trim();

    console.log("Dificultad: [1]- Fácil  [2]- Medio  [3]- Difícil");
    let dificultad = prompt("Elige la dificultad (1,2,3 - enter=Fácil): ").trim();
    if (dificultad === "") dificultad = "1";
    while (isNaN(dificultad) || parseInt(dificultad) < 1 || parseInt(dificultad) > 3) {
        console.log("⚠️ Dificultad inválida.");
        dificultad = prompt("Elige la dificultad (1,2,3): ").trim();
    }

    let vencimiento = prompt("Ingrese la fecha de vencimiento (dd/mm/aaaa - enter para 'Sin fecha'): ").trim();
    if (vencimiento === "") vencimiento = "Sin fecha";

    console.log("===================================");
    return { titulo, descripcion, dificultad, vencimiento };
}







import { dificultadlunas } from "./moon.js";

// mostrar detalles y editar
export function mostrarDetallesYEditar(tarea) {
    console.log("========= DETALLES DE LA TAREA ==========");
    console.log("ID: " + tarea.id);
    console.log("Título: " + tarea.titulo);
    console.log("Descripción: " + tarea.descripcion);
    console.log("Estado: " + tarea.estado);
    console.log("Dificultad: " + dificultadlunas(tarea.dificultad));
    console.log("Creación: " + tarea.inicioF.toLocaleDateString());
    console.log("Vencimiento:", tarea.vencimiento ? tarea.vencimiento : "No especificado");
    console.log("=========================================");
    console.log("[E] Editar  [0] Volver");

    const op = prompt("Opción: ").trim();
    if (op.toLowerCase() === "e") {
        editarTarea(tarea);
    }
}








// editar tarea
function editarTarea(tarea) {
    const Ntitulo = prompt(`Nuevo título (${tarea.titulo}): `).trim();
    if (Ntitulo !== "") tarea.titulo = Ntitulo;

    const Ndescripcion = prompt(`Nueva descripción (${tarea.descripcion}): `).trim();
    if (Ndescripcion !== "") tarea.descripcion = Ndescripcion;

    console.log("Estados: [1]- Pendiente  [2]- En curso  [3]- Terminada  [4]- Cancelada");
    let Nestado = prompt(`Nuevo estado (${tarea.estado}): `).trim();
    if (Nestado !== "") {
        while (isNaN(Nestado) || parseInt(Nestado) < 1 || parseInt(Nestado) > 4) {
            console.log("Estado inválido.");
            Nestado = prompt("Nuevo estado (1-4): ").trim();
        }
        tarea.estado = ["pendiente", "en curso", "terminada", "cancelada"][parseInt(Nestado) - 1];
    }

    console.log("Dificultad: [1]- Fácil  [2]- Medio  [3]- Difícil");
    let Ndificultad = prompt(`Nueva dificultad (${tarea.dificultad}): `).trim();
    if (Ndificultad !== "") {
        while (isNaN(Ndificultad) || parseInt(Ndificultad) < 1 || parseInt(Ndificultad) > 3) {
            console.log("Dificultad inválida.");
            Ndificultad = prompt("Nueva dificultad (1-3): ").trim();
        }
        tarea.dificultad = Ndificultad;
    }

    let Nvencimiento = prompt(`Nueva fecha de vencimiento (${tarea.vencimiento}) o enter para mantener: `).trim();
    if (Nvencimiento !== "") {
        tarea.vencimiento = Nvencimiento;
    }

    console.log("✅ Tarea editada con éxito.");
    prompt("ENTER para continuar...");
}







// mostrar tareas por estado
export function mostrarTareasPorEstado(tipo) {
    let lista;
    if (tipo === "todas") lista = obtenerTareas();
    else lista = obtenerestados(tipo);

    if (lista.length === 0) {
        console.log("No hay tareas para mostrar.");
        prompt("ENTER para continuar...");
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        console.log(`[${i + 1}] ${lista[i].titulo} (${lista[i].estado})`);
    }

    let n = prompt("Ingrese el número de la tarea para ver detalles o 0 para volver: ").trim();

        // validar entrada vacia o invalida
        while (n === "" || isNaN(n) || parseInt(n) < 0 || parseInt(n) > lista.length) {
            console.log("Número inválido.");
            n = prompt("Ingrese el número de la tarea para ver detalles o 0 para volver: ").trim();
        }

        n = parseInt(n);
        if (n === 0) return;

        mostrarDetallesYEditar(lista[n - 1]);

}
