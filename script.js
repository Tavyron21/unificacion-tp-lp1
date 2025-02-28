// Maneja el envío del formulario de registro
document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario recargue la página
    const nombre = document.getElementById('nombre').value; // Obtiene el nombre del jugador
    const simboloJugador = document.querySelector('input[name="simbolo"]:checked').value; // Obtiene el símbolo seleccionado (X o O)
    const simboloIA = simboloJugador === 'X' ? 'O' : 'X'; // Asigna a la IA el símbolo contrario

    // Guarda los datos en localStorage
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('simboloJugador', simboloJugador);
    localStorage.setItem('simboloIA', simboloIA);

    // Oculta la pantalla de registro y muestra la de bienvenida
    document.getElementById('registro').classList.add('hidden');
    document.getElementById('bienvenida').classList.remove('hidden');
    document.getElementById('nombreUsuario').textContent = nombre; // Muestra el nombre del jugador
});

// Maneja el clic en el botón de Jugador vs Jugador
document.getElementById('jugadorVsJugador').addEventListener('click', () => iniciarJuego('jugadorVsJugador'));

// Maneja el clic en el botón de Jugador vs IA
document.getElementById('jugadorVsIA').addEventListener('click', () => document.getElementById('dificultad').classList.remove('hidden'));

// Asigna eventos a los botones de dificultad
['facil', 'medio', 'dificil'].forEach(id => document.getElementById(id).addEventListener('click', () => iniciarJuego(id)));

// Variables para llevar el conteo de victorias y empates
let victoriasJugador1 = 0, victoriasJugador2 = 0, empates = 0;

// Función para iniciar el juego según el modo seleccionado
function iniciarJuego(modo) {
    localStorage.setItem('modo', modo); // Guarda el modo de juego en localStorage
    document.getElementById('bienvenida').classList.add('hidden'); // Oculta la pantalla de bienvenida
    document.getElementById('juego').classList.remove('hidden'); // Muestra la pantalla del juego
    inicializarTablero(); // Inicializa el tablero
}

// Inicializa el tablero de juego
function inicializarTablero() {
    const celdas = document.querySelectorAll('.celda');
    celdas.forEach(celda => {
        celda.textContent = ''; // Limpia el contenido de cada celda
        celda.removeAttribute('data-symbol'); // Elimina el atributo de símbolo
        celda.addEventListener('click', manejarClickCelda); // Asigna el evento de clic a cada celda
    });
    localStorage.setItem('turnoActual', 'X'); // Establece el turno inicial en X
}

// Maneja el clic en una celda del tablero
function manejarClickCelda(event) {
    const celda = event.target;
    const modo = localStorage.getItem('modo');
    const turnoActual = localStorage.getItem('turnoActual');

    celda.textContent = turnoActual; // Coloca el símbolo en la celda
    celda.setAttribute('data-symbol', turnoActual); // Guarda el símbolo en el atributo
    celda.removeEventListener('click', manejarClickCelda); // Desactiva más clics en la misma celda

    // Verifica si hay un ganador
    if (verificarGanador(turnoActual)) {
        if (turnoActual === localStorage.getItem('simboloJugador')) {
            victoriasJugador1++;
            document.getElementById('victoriasJugador1').textContent = victoriasJugador1;
        } else {
            victoriasJugador2++;
            document.getElementById('victoriasJugador2').textContent = victoriasJugador2;
        }
        alert(`¡${turnoActual === localStorage.getItem('simboloJugador') ? localStorage.getItem('nombre') : 'Jugador 2'} ha ganado!`);
        reiniciarJuego();
        return;
    }

    // Verifica si hay un empate
    if (verificarEmpate()) {
        empates++;
        document.getElementById('empates').textContent = empates;
        alert('¡Empate!');
        reiniciarJuego();
        return;
    }

    // Cambia al siguiente turno
    const siguienteTurno = turnoActual === 'X' ? 'O' : 'X';
    localStorage.setItem('turnoActual', siguienteTurno);

    // Si es modo IA, realiza un movimiento después de un segundo
    if (modo !== 'jugadorVsJugador') setTimeout(movimientoIA, 1000);
}

// Función para el movimiento de la IA
function movimientoIA() {
    const celdas = document.querySelectorAll('.celda');
    const celdasVacias = [...celdas].filter(celda => celda.textContent === ''); // Filtra celdas vacías

    if (celdasVacias.length > 0) {
        const simboloIA = localStorage.getItem('simboloIA');
        const celdaAleatoria = celdasVacias[Math.floor(Math.random() * celdasVacias.length)]; // Selecciona una celda al azar

        celdaAleatoria.textContent = simboloIA;
        celdaAleatoria.setAttribute('data-symbol', simboloIA);
        celdaAleatoria.removeEventListener('click', manejarClickCelda);

        // Verifica si la IA ganó
        if (verificarGanador(simboloIA)) {
            victoriasJugador2++;
            document.getElementById('victoriasJugador2').textContent = victoriasJugador2;
            alert('¡La IA ha ganado!');
            reiniciarJuego();
            return;
        }

        // Verifica si hay un empate
        if (verificarEmpate()) {
            empates++;
            document.getElementById('empates').textContent = empates;
            alert('¡Empate!');
            reiniciarJuego();
            return;
        }

        // Cambia al turno del jugador
        localStorage.setItem('turnoActual', localStorage.getItem('simboloJugador'));
    }
}

// Función para verificar si hay un ganador
function verificarGanador(simbolo) {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]  // Diagonales
    ];

    const celdas = document.querySelectorAll('.celda');
    return combinacionesGanadoras.some(combinacion => combinacion.every(index => celdas[index].textContent === simbolo));
}

// Función para verificar si hay un empate
function verificarEmpate() {
    const celdas = document.querySelectorAll('.celda');
    return [...celdas].every(celda => celda.textContent !== ''); // Verifica si todas las celdas están ocupadas
}

// Función para reiniciar el juego
function reiniciarJuego() {
    inicializarTablero();
}

// Maneja el clic en el botón de volver
document.getElementById('volver').addEventListener('click', () => {
    document.getElementById('juego').classList.add('hidden'); // Oculta la pantalla del juego
    document.getElementById('bienvenida').classList.remove('hidden'); // Muestra la pantalla de bienvenida
});

// Maneja el clic en el botón de reiniciar
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);
