/*>>>>>>>>>>>>>>>>>>> Elementos de id <<<<<<<<<<<<<<<<<<<*/

//Contenedores
let contenedorCabecera = document.getElementById("contenedor-cabecera");
let contenedorArticulo = document.getElementById("contenedor-articulo");
let contenedorPieDePagina = document.getElementById("contenedor-pie-de-pagina");
let contenedorTexto = document.getElementById("contenedor-texto");

//Botones
let botonTitulo = document.getElementById("boton-titulo");
let botonMicrofono = document.getElementById("boton-microfono");

//Lineas
let lineaVertical = document.getElementById("linea-vertical");

/*>>>>>>>>>>>>>>>>>>> Elementos de clase <<<<<<<<<<<<<<<<<<<*/

//Contenedores
let contenedorSinBorde = document.getElementsByClassName("contenedorSinBorde");
let contenedorConBorde = document.getElementsByClassName("contenedorConBorde");

/*>>>>>>>>>>>>>>>>>>> Funciones <<<<<<<<<<<<<<<<<<<*/
let refrescarPagina = () => location.reload();

let animacionHover = (elemento) => elemento.style.animation = "animacion-boton-hover 0.2s forwards";

let animacionHoverOut = (elemento) => elemento.style.animation = "animacion-boton-hover-out 0.2s forwards";

let animacionClick = (elemento) => {
    elemento.style.animation = "animacion-boton-click 0.2s forwards";
    setTimeout(() => {
        elemento.style.animation = "animacion-boton-click-restart 0.2s forwards";
    }, 200);

    if (botonMicrofono.textContent == "mic") {
        botonMicrofono.textContent = "mic_off";
        detenerReconocimiento();
    }
    else{
        botonMicrofono.textContent = "mic";
        iniciarReconocimiento();
    }
    
}

/*>>>>>>>>>>>>>>>>>>> Funciones de eventos <<<<<<<<<<<<<<<<<<<*/
botonTitulo.addEventListener("click", refrescarPagina);

botonMicrofono.addEventListener("mouseover", () => animacionHover(botonMicrofono));
botonMicrofono.addEventListener("mouseout", () => animacionHoverOut(botonMicrofono));
botonMicrofono.addEventListener("click", () => animacionClick(botonMicrofono));

botonTitulo.addEventListener("mouseover", () => animacionHover(botonTitulo));
botonTitulo.addEventListener("mouseout", () => animacionHoverOut(botonTitulo));

/*>>>>>>>>>>>>>>>>>>> Codigo de reconocimiento de voz <<<<<<<<<<<<<<<<<<<*/
let recognition;
    if (!('webkitSpeechRecognition' in window)) {
        alert("Api desactivada");
    }
    else {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "es-mx";
        recognition.interim = true;
        recognition.addEventListener("result", iniciar);
    }

    function iniciar(event){
        for (i = event.resultIndex; i<event.results.length; i++){
            if(event.results[i].isFinal){
                let texto = event.results[i][0].transcript;
                contenedorTexto.textContent = texto.toLowerCase();

                //Refrescar la pagina
                if(texto.toLowerCase().includes("refrescar página" || "refrescar la página")){
                    contenedorTexto.textContent = "Refrescando página...";
                    setTimeout(() => refrescarPagina(), 1000);
                }

                //Busqueda de texto en google
                if(texto.toLowerCase().includes("buscar en google")){
                    contenedorTexto.textContent = "Buscando en google...";
                    setTimeout(() => window.open("https://www.google.com/search?q=" + texto.toLowerCase().replace("buscar en google", "")), 1000);
                }

                //Cerrar la ventana
                if(texto.toLowerCase().includes("cerrar ventana")){
                    contenedorTexto.textContent = "Cerrando ventana...";
                    setTimeout(() => window.close(), 1000);
                }

                //Busqueda en youtube
                if(texto.toLowerCase().includes("buscar en youtube")){
                    contenedorTexto.textContent = "Buscando en youtube...";
                    setTimeout(() => window.open("https://www.youtube.com/results?search_query=" + texto.toLowerCase().replace("buscar en youtube", "")), 1000);
                }
                
                //Codigo konami
                if(texto.toLowerCase().includes("arriba arriba abajo abajo izquierda derecha izquierda derecha b a")){
                    contenedorTexto.textContent = "Oh no...";
                    setTimeout(() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), 1000);
                }

                //Mostrar comandos disponibles
                if(texto.toLowerCase().includes("comandos disponibles")){ 
                    contenedorTexto.innerHTML = "<h2>Comandos disponibles</h2> <div id='contenedor-comandos' class='contenedor-comandos'> <ul> <li>Refrescar página</li> <li>Buscar en google</li> <li>Cerrar ventana</li> <li>Reproduce mi playlist</li> </ul> <ul> <li>Codigo konami</li> </ul> </div>";
                }
            }
        }
    }

const iniciarReconocimiento = () => recognition.start();
const detenerReconocimiento = () => recognition.stop();

iniciarReconocimiento();