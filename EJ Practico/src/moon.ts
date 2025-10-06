// moon.ts
export function dificultadlunas(num: string): string {
    if (num === "1") return "🌕🌑🌑 Fácil";
    if (num === "2") return "🌕🌕🌑 Medio";
    if (num === "3") return "🌕🌕🌕 Difícil";
    return "🌕🌑🌑 Fácil"; 
}

// se agregan (num: string): string para tipar la función y sus parámetros