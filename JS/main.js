/*>>>>>>>>>>>>>>>>>>> Elementos de id <<<<<<<<<<<<<<<<<<<*/
let contenedorPrincipal = document.getElementById('contenedor-principal');
let contenedorCabecera = document.getElementById('contenedor-cabecera');
let contenedorArticulo = document.getElementById('contenedor-articulo');

let botonTitulo = document.getElementById('boton-titulo');
let seccionTexto = document.getElementById('seccion-texto');

let recognition = new webkitSpeechRecognition();

let preloader = document.getElementById('preloader-container');

/*>>>>>>>>>>>>>>>>>>> Funciones <<<<<<<<<<<<<<<<<<<*/
let refrescarPagina = () => location.reload();

let iniciarReconocimiento = () => recognition.start();
let detenerReconocimiento = () => recognition.stop();

let ocultarPreloader = () => preloader.style.display = "none";
/*>>>>>>>>>>>>>>>>>>> Eventos <<<<<<<<<<<<<<<<<<<*/
botonTitulo.addEventListener('click', refrescarPagina);
window.addEventListener("load", ocultarPreloader);

/*>>>>>>>>>>>>>>>>>>> Reconocimiento de voz <<<<<<<<<<<<<<<<<<<*/
let initRecognition = (event) => {

    for (i = event.resultIndex; i < event.results.length; i++) {

        if (event.results[i].isFinal) {

            let texto = event.results[i][0].transcript;
            let flag = false;

            //Paginas de busqueda
            if (texto.toLowerCase().includes("busca") || texto.toLowerCase().includes("buscar")) {

                //Remplazamos buscar por busca
                texto = texto.toLowerCase().replace("buscar", "busca");

                //Busqueda de texto en google
                if (texto.toLowerCase().includes("busca en google")) {
                    typeText(seccionTexto, "Buscando en google...");
                    setTimeout(() => window.open("https://www.google.com/search?q=" + texto.toLowerCase().replace("busca en google", "")), 1000);
                    flag = true;
                }

                //Busqueda de texto en youtube
                else if (texto.toLowerCase().includes("busca en youtube")) {
                    typeText(seccionTexto, "Buscando en youtube...");
                    setTimeout(() => window.open("https://www.youtube.com/results?search_query=" + texto.toLowerCase().replace("busca en youtube", "")), 1000);
                    flag = true;
                }

                //Busqueda de texto en facebook
                else if (texto.toLowerCase().includes("busca en facebook")) {
                    typeText(seccionTexto, "Buscando en facebook...");
                    setTimeout(() => window.open("https://www.facebook.com/search/top/?q=" + texto.toLowerCase().replace("busca en facebook", "")), 1000);
                    flag = true;
                }

                //Busqueda de texto en twitter
                else if (texto.toLowerCase().includes("busca en twitter")) {
                    typeText(seccionTexto, "Buscando en twitter...");
                    setTimeout(() => window.open("https://twitter.com/search?q=" + texto.toLowerCase().replace("busca en twitter", "")), 1000);
                    flag = true;
                }

                //Busqueda de texto en pinterest
                else if (texto.toLowerCase().includes("busca en pinterest")) {
                    typeText(seccionTexto, "Buscando en pinterest...");
                    setTimeout(() => window.open("https://www.pinterest.com/search/pins/?q=" + texto.toLowerCase().replace("busca en pinterest", "")), 1000);
                    flag = true;
                }

                //Busqueda de texto en spotify
                else if (texto.toLowerCase().includes("busca en spotify")) {
                    typeText(seccionTexto, "Buscando en spotify...");
                    setTimeout(() => window.open("https://open.spotify.com/search/" + texto.toLowerCase().replace("busca en spotify", "")), 1000);
                    flag = true;
                }

                //Busqueda de texto en wikipedia
                else if (texto.toLowerCase().includes("busca en wikipedia")) {
                    typeText(seccionTexto, "Buscando en wikipedia...");
                    setTimeout(() => window.open("https://es.wikipedia.org/wiki/" + texto.toLowerCase().replace("busca en wikipedia", "")), 1000);
                    flag = true;
                }

            }

            //Calcula
            if (texto.toLowerCase().includes("calcula")) {
                let calculo = texto.toLowerCase().replace("calcula", "");
                calculo = calculo.replace("entre", "/");
                calculo = calculo.replace("mas", "+");
                calculo = calculo.replace("más", "+");
                calculo = calculo.replace("menos", "-");
                calculo = calculo.replace("por", "*");
                typeText(seccionTexto, "El resultado es: " + eval(calculo));
                flag = true;
            }

            //Mostrar comandos disponibles
            if (texto.toLowerCase().includes("comandos disponibles")) {
                seccionTexto.innerHTML = '<h2 class="title-comandos-structure title-comandos-skin">Comandos disponibles</h2> <div id="contenedor-comandos" class="contenedor-comandos-structure contenedor-comandos-skin"> <ul class="lista-comandos-structure lista-comandos-skin"> <li>Busca en google</li> <li>Busca en youtube</li> <li>Busca en facebook</li> <li>Busca en twitter</li> <li>Busca en pinterest</li> <li>Busca en spotify</li> <li>Busca en wikipedia</li> <li>Calcula</li> <li>Comandos disponibles</li> </ul> </div>';
                flag = true;
            }

            if (!flag) {
                seccionTexto.textContent = "";
                typeText(seccionTexto, texto);
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

/*>>>>>>>>>>>>>>>>>>> TypeIt <<<<<<<<<<<<<<<<<<<*/
let typeText = (element, text) => {
    element.textContent = "";
    
    let i = 0;
    let interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i == text.length) {
            clearInterval(interval);
        }
    }, 20);

}

validateRecognition();
iniciarReconocimiento();