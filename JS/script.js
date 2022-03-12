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
                contenedorTexto.textContent = texto;
            }
        }
    }

function iniciarReconocimiento(){
        recognition.start();
}

function detenerReconocimiento(){
        recognition.stop();
}

iniciarReconocimiento();