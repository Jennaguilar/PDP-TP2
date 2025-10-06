// data.ts
// Definimos la interfaz Tarea para tipar las tareas correctamente
export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    dificultad: string; // "1", "2", "3"
    estado: string; // "pendiente", "en curso", "terminada", "cancelada"
    inicioF: Date;
    vencimiento: string; // "dd/mm/aaaa" o "Sin fecha"
}


export const tareas: Tarea[] = []; // Tipamos el arreglo de tareas con el tipo Tarea[]
export const ESTADOS: string[] = ["pendiente", "en curso", "terminada", "cancelada"];
// posibles estados de una tarea
export const DIFICULTAD = {
    1: "🌕🌑🌑 Fácil",
    2: "🌕🌕🌑 Medio",
    3: "🌕🌕🌕 Difícil",
};


import { dificultadlunas } from "./moon.js"; 

// console.log("Dificultad: " + dificultadlunas(tarea.dificultad));


let id: number = 1; // id único
// tipado number para la variable id

// crear nueva tarea
export function crearTarea(
    titulo: string, 
    descripcion: string, 
    dificultad: string, 
    vencimiento: string = "sin fecha"
): Tarea {
    const ahora: Date = new Date();
    const tarea: Tarea = {
        id: id++, 
        titulo: titulo,
        descripcion: descripcion,
        dificultad: dificultad || "1", 
        estado: "pendiente",
        inicioF: ahora,
        vencimiento: vencimiento || "Sin fecha"
    }
    return tarea;
}

export function guardarTarea(tarea: Tarea): void {
    tareas[tareas.length] = tarea; 
}

export function buscarporid(id: number): Tarea | null { 
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            return tareas[i];
        }
    }
    return null;
}

export function buscarporTitulo(titulo: string): Tarea[] {
    const resultados: Tarea[] = [];
    let j = 0;
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].titulo.toLowerCase().includes(titulo.toLowerCase())) {
            resultados[j] = tareas[i];
            j++;
        }
    }
    return resultados;
}

export function obtenerestados(estado: string): Tarea[] {
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
