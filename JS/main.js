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

            //Busqueda de texto en google
            if (texto.toLowerCase().includes("buscar en google")) {
                seccionTexto.textContent = "Buscando en google...";
                setTimeout(() => window.open("https://www.google.com/search?q=" + texto.toLowerCase().replace("buscar en google", "")), 1000);
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

            //Calcula
            if (texto.toLowerCase().includes("calcula")) {
                let calculo = texto.toLowerCase().replace("calcula", "");
                calculo = calculo.replace("entre", "/");
                calculo = calculo.replace("mas", "+");
                calculo = calculo.replace("más", "+");
                calculo = calculo.replace("menos", "-");
                calculo = calculo.replace("por", "*");
                seccionTexto.textContent = "El resultado es: " + eval(calculo);
            }

            //Mostrar comandos disponibles
            if (texto.toLowerCase().includes("comandos disponibles")) {
                seccionTexto.innerHTML = '<h2>Comandos disponibles</h2> <div id="contenedor-comandos" class="contenedor-comandos"> <ul> <li>Buscar en google</li> <li>Buscar en youtube</li> </ul> <ul> <li>Codigo kona</li> <li>Calcula</li> </ul> </div>';
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
