// tareas.js
import PromptSync from "prompt-sync";
import { obtenerTareas, obtenerestados } from "./data.js";
import { dificultadlunas } from "./moon.js";
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
    if (dificultad === "")
        dificultad = "1";
    // parseInt() convierte al string al numero antes de comparar
    // number.isNaN() en ts espera a un number
    while (Number.isNaN(dificultad) || Number(dificultad) < 1 || Number(dificultad) > 3) {
        console.log("⚠️ Dificultad inválida.");
        dificultad = prompt("Elige la dificultad (1,2,3): ").trim();
    }
    let vencimiento = prompt("Ingrese la fecha de vencimiento (dd/mm/aaaa - enter para 'Sin fecha'): ").trim();
    if (vencimiento === "")
        vencimiento = "Sin fecha";
    console.log("===================================");
    return { titulo, descripcion, dificultad, vencimiento };
}
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
    const op = prompt("Opcion: ").trim();
    if (op.toLowerCase() === "e")
        editarTarea(tarea);
}
// editar tarea
function editarTarea(tarea) {
    const Ntitulo = prompt(`Nuevo título (${tarea.titulo}): `).trim();
    if (Ntitulo !== "")
        tarea.titulo = Ntitulo;
    const Ndescripcion = prompt(`Nueva descripción (${tarea.descripcion}): `).trim();
    if (Ndescripcion !== "")
        tarea.descripcion = Ndescripcion;
    console.log("Estados: [1]- Pendiente  [2]- En curso  [3]- Terminada  [4]- Cancelada");
    let Nestado = prompt(`Nuevo estado (${tarea.estado}): `).trim();
    if (Nestado !== "") {
        // (isNaN(Nestado) a (Number.isNaN(Number(Nestado)) y parseInt convertimos antes de comparar
        while (Number.isNaN(Number(Nestado)) || Number(Nestado) < 1 || Number(Nestado) > 4) {
            console.log("Estado inválido.");
            Nestado = prompt("Nuevo estado (1-4): ").trim();
        }
        tarea.estado = ["pendiente", "en curso", "terminada", "cancelada"][Number(Nestado) - 1];
    }
    console.log("Dificultad: [1]- Fácil  [2]- Medio  [3]- Difícil");
    let Ndificultad = prompt(`Nueva dificultad (${tarea.dificultad}): `).trim();
    if (Ndificultad !== "") {
        while (Number.isNaN(Number(Ndificultad)) || Number(Ndificultad) < 1 || Number(Ndificultad) > 3) {
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
    if (tipo === "todas")
        lista = obtenerTareas();
    else
        lista = obtenerestados(tipo);
    if (lista.length === 0) {
        console.log("No hay tareas para mostrar.");
        prompt("ENTER para continuar...");
        return;
    }
    for (let i = 0; i < lista.length; i++) {
        console.log(`[${i + 1}] ${lista[i].titulo} (${lista[i].estado})`);
    }
    // nStr guarda las entradas como String y n la conversion numerica
    let nStr = prompt("Ingrese el número de la tarea para ver detalles o 0 para volver: ").trim();
    let n = Number(nStr);
    // validar entrada vacia o invalida
    while (nStr === "" || Number.isNaN(n) || n < 0 || n > lista.length) {
        // ahora las comparaciones son numericas en vez de parseInt ahora es solo n
        console.log("Número inválido.");
        nStr = prompt("Ingrese el número de la tarea para ver detalles o 0 para volver: ").trim();
        n = Number(nStr);
    }
    if (n === 0)
        return;
    mostrarDetallesYEditar(lista[n - 1]);
}
