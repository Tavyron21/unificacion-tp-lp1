const vsJugadorBoton = document.getElementById('vsJugador');
const vsIABoton = document.getElementById('vsIA');
const dificultadDiv = document.getElementById('dificultad');
const facilBoton = document.getElementById('facil');
const medioBoton = document.getElementById('medio');
const dificilBoton = document.getElementById('dificil');
const bienvenida = document.getElementById('bienvenida');
const configuracion = document.getElementById('configuracion');
const volumenInput = document.getElementById('volumen');
const toggleMusicaBoton = document.getElementById('toggleMusica');
const volverBienvenidaBoton = document.getElementById('volverBienvenida');
const musica = document.getElementById('musica');

let vsIA = false;
let dificultad = 'facil'; // 'facil', 'medio', 'dificil'

vsJugadorBoton.addEventListener('click', () => {
    vsIA = false;
    bienvenida.style.display = 'none';
    configuracion.style.display = 'block';
});

vsIABoton.addEventListener('click', () => {
    vsIA = true;
    dificultadDiv.style.display = 'block';
});

facilBoton.addEventListener('click', () => {
    dificultad = 'facil';
    bienvenida.style.display = 'none';
    configuracion.style.display = 'block';
});

medioBoton.addEventListener('click', () => {
    dificultad = 'medio';
    bienvenida.style.display = 'none';
    configuracion.style.display = 'block';
});

dificilBoton.addEventListener('click', () => {
    dificultad = 'dificil';
    bienvenida.style.display = 'none';
    configuracion.style.display = 'block';
});

volumenInput.addEventListener('input', () => {
    musica.volume = volumenInput.value;
});

toggleMusicaBoton.addEventListener('click', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

volverBienvenidaBoton.addEventListener('click', () => {
    configuracion.style.display = 'none';
    bienvenida.style.display = 'block';
});