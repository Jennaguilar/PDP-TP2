// index.js
import PromptSync from "prompt-sync";
import { menuPrincipal, menuVerTareas } from "./menu.js";
import { ingresarDatos, mostrarDetallesYEditar, mostrarTareasPorEstado } from "./tareas.js";
import { crearTarea, guardarTarea, buscarporid, buscarporTitulo, obtenerTareas } from "./data.js";

const prompt = PromptSync();

function main() {
    let opcion;
    do {
        menuPrincipal();
        opcion = prompt("Elige una opción: ").trim();
       
        switch (opcion) {
            case "1":
                let opver;
                do {
                    menuVerTareas();
                    opver = prompt("Elige una opción: ").trim();
                    if (opver === "1") mostrarTareasPorEstado("todas");
                    else if (opver === "2") mostrarTareasPorEstado("pendiente");
                    else if (opver === "3") mostrarTareasPorEstado("en curso");
                    else if (opver === "4") mostrarTareasPorEstado("terminada");
                } while (opver !== "0");
                break;

            case "2":
                if (obtenerTareas().length === 0) {
                    console.log("No hay tareas.");
                    break;
                }
                const clave = prompt("Buscar por [1]. ID o [2]. Título: ").trim();
                if (clave === "1") {
                    const id = parseInt(prompt("Ingresa el ID de la tarea: ").trim());
                    const tareaPorId = buscarporid(id);
                    if (tareaPorId) {
                        mostrarDetallesYEditar(tareaPorId);
                    } else {
                        console.log("Tarea no encontrada.");
                    }
                } else if (clave === "2") {
                    const titulo = prompt("Ingresa el título de la tarea: ").trim();
                    const tareasPorTitulo = buscarporTitulo(titulo); 
                    if (tareasPorTitulo.length > 0) {
                        for (let i = 0; i < tareasPorTitulo.length; i++) {
                            console.log(`[${i + 1}] ${tareasPorTitulo[i].titulo}`);
                        }
                        let sel = parseInt(prompt("Número para detalle (0 para volver): ").trim());
                        if (sel > 0 && sel <= tareasPorTitulo.length) {
                            mostrarDetallesYEditar(tareasPorTitulo[sel - 1]);
                        }
                    } else {
                        console.log("Tarea no encontrada.");
                    }
                } else {
                    console.log("Opción inválida.");
                }
                break;

            case "3":
                const datos = ingresarDatos();
                const nuevaTarea = crearTarea(datos.titulo, datos.descripcion, datos.dificultad, datos.vencimiento);
                guardarTarea(nuevaTarea);
                console.log("Tarea agregada exitosamente.");
                break;

            case "4":
                console.log("Saliendo...");
                break;

            default:
                console.log("Opción inválida. Intenta de nuevo.");
        }
    } while (opcion !== "4");
} 

main();
