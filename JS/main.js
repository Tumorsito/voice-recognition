/*>>>>>>>>>>>>>>>>>>> Elementos de id <<<<<<<<<<<<<<<<<<<*/
let contenedorPrincipal = document.getElementById('contenedor-principal');
let contenedorCabecera = document.getElementById('contenedor-cabecera');
let contenedorArticulo = document.getElementById('contenedor-articulo');

let botonTitulo = document.getElementById('boton-titulo');
let seccionTexto = document.getElementById('seccion-texto');

let recognition = new webkitSpeechRecognition();

/*>>>>>>>>>>>>>>>>>>> Funciones <<<<<<<<<<<<<<<<<<<*/
let refrescarPagina = () => location.reload();
let iniciarReconocimiento = () => recognition.start();
let detenerReconocimiento = () => recognition.stop();

/*>>>>>>>>>>>>>>>>>>> Eventos <<<<<<<<<<<<<<<<<<<*/
botonTitulo.addEventListener('click', refrescarPagina);

/*>>>>>>>>>>>>>>>>>>> Reconocimiento de voz <<<<<<<<<<<<<<<<<<<*/
let initRecognition = (event) => {
    
    for (i = event.resultIndex; i < event.results.length; i++) {
        
        if (event.results[i].isFinal) {

            let texto = event.results[i][0].transcript;
            seccionTexto.textContent = texto.toLowerCase();

            //Refrescar la pagina
            if (texto.toLowerCase().includes("refrescar página" || "refrescar la página")) {
                seccionTexto.textContent = "Refrescando página...";
                setTimeout(() => refrescarPagina(), 1000);
            }

            //Busqueda de texto en google
            if (texto.toLowerCase().includes("buscar en google")) {
                seccionTexto.textContent = "Buscando en google...";
                setTimeout(() => window.open("https://www.google.com/search?q=" + texto.toLowerCase().replace("buscar en google", "")), 1000);
            }

            //Cerrar la ventana
            if (texto.toLowerCase().includes("cerrar ventana")) {
                seccionTexto.textContent = "Cerrando ventana...";
                setTimeout(() => window.close(), 1000);
            }

            //Busqueda en youtube
            if (texto.toLowerCase().includes("buscar en youtube")) {
                seccionTexto.textContent = "Buscando en youtube...";
                setTimeout(() => window.open("https://www.youtube.com/results?search_query=" + texto.toLowerCase().replace("buscar en youtube", "")), 1000);
            }

            //Codigo konami
            if (texto.toLowerCase().includes("arriba arriba abajo abajo izquierda derecha izquierda derecha b a")) {
                seccionTexto.textContent = "Oh no...";
                setTimeout(() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), 1000);
            }

            //Mostrar comandos disponibles
            if (texto.toLowerCase().includes("comandos disponibles")) {
                seccionTexto.innerHTML = '<h2>Comandos disponibles</h2> <div id="contenedor-comandos" class="contenedor-comandos"> <ul> <li>Refrescar página</li> <li>Cerrar ventana</li> <li>Buscar en google</li> <li>Buscar en youtube</li> </ul> <ul> <li>Codigo konami</li> </ul> </div>';
            }

        }

    }

}

let validateRecognition = (event) => {
    if (!('webkitSpeechRecognition' in window)) {
        seccionTexto.textContent = "Tu navegador no soporta el reconocimiento de voz, por favor ingresa en Google Chrome";
    }
    
    else {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "es-mx";
        recognition.interim = true;
        recognition.addEventListener("result", initRecognition);
    }
}

validateRecognition();
iniciarReconocimiento();
