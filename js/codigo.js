//#region Variables
let nombreJugador = procedenciaJugador = '';
let ganador = intentos = victorias = 0;
let numeroRival = Math.floor(Math.random() * 20) + 1;
let tabla = document.createElement('table')
let tablaVs = document.querySelector("#tablaVs");
let tablaIntentos = document.querySelector("#tablaIntentos");
let tablaContrarreloj = document.querySelector("#tablaTiempo");
let h2Single = tablaIntentos.getElementsByTagName("h2")[0]
let h2Vs = tablaVs.getElementsByTagName("h2")[0]
let h2ContraR = tablaContrarreloj.getElementsByTagName("h2")[0]
let textoNumerosElegidos = "Numeros elegidos: "
const chances = 5;
var ganasteTu, ganoRival = false;
let ulSingle = tablaIntentos.getElementsByTagName("ul")[0];
let ulVs = tablaVs.getElementsByTagName("ul")[0];
let ulContraR = tablaContrarreloj.getElementsByTagName("ul")[0];
var jugadores, numerosElegidosRival = new Array();
let numerosElegidos = [];
const colorVictorioso = 'rgb(171, 250, 171)';
const refresca = "Si querés volver a jugar, refrescá la página.";
let parrafosMensaje = document.getElementsByClassName("mensajeResultado")
let tiempoInicial = 20.3;
let countdown = document.getElementById("reloj20secs")
let modo;
let intervalo;
//#endregion





//#region Funciones

function empezarReloj(){
    clearInterval(intervalo)
    intervalo = setInterval(actualizarReloj,10)
}

function actualizarReloj(){    
    if(tiempoInicial <0 || isNaN(tiempoInicial)){
    tiempoInicial = 'Fin.'
    tuResultado(false,"Se te acabo el tiempo. ");
    clearInterval(intervalo)
    document.getElementById("btnClock").disabled = true;
    }else
    tiempoInicial-= 0.01;            
    (tiempoInicial>0)?countdown.innerHTML = tiempoInicial.toFixed(1):countdown.innerHTML = "Fin"
    
}

document.getElementById("btnClock").addEventListener("click",ingresarNumeroContrarreloj)

function ingresarNumeroContrarreloj(){
    let numeroIngresado = Number(document.getElementById("numeroClock").value);
    
    if(numeroIngresado < 50 && numeroIngresado > 0)
    (numeroIngresado == ganador)?correctoReloj():incorrectoReloj(numeroIngresado)         
    else{
        parrafosMensaje[2].innerHTML = "El número debe estar entre 1 y 50."
        parrafosMensaje[2].classList.add("pError")
        setTimeout(() => {
            parrafosMensaje[2].classList.remove("pError");
            parrafosMensaje[2].innerHTML = "";
        }, 2000)
    }
    document.getElementById("numerosElegidosClock").innerHTML = [...numerosElegidos]   
}

function correctoReloj(){
    clearInterval(intervalo)
    mostrarIngreso();
}

function incorrectoReloj(numeroIngresado){
numeroIncorrecto(numeroIngresado,0);
numerosElegidos.push(numeroIngresado);
}



const esconderSecciones = function () {
    document.getElementById("one").style.display = "none"
    document.getElementById("two").style.display = "none"
    document.getElementById("three").style.display = "none"
    document.getElementById("four").style.display = "none"
    document.getElementById("main").style.display = "block"

}

esconderSecciones();

document.querySelector("#singlePlayer").addEventListener("click", singlePlayer)
document.querySelector("#vsBtn").addEventListener("click", vsBtn)
document.querySelector("#reloj").addEventListener("click", contrarreloj)

function singlePlayer() {
    document.getElementById("main").style.display = "none";
    document.getElementById("one").style.display = "block";
    document.getElementById("three").style.display = "none";
    document.getElementById("four").style.display = "none";
    ganador = Math.floor(Math.random() * 100) + 1;
    console.log(ganador)
    modo = "intentos"
}



function vsBtn() {
    document.getElementById("main").style.display = "none"
    document.getElementById("two").style.display = "block"
    document.getElementById("three").style.display = "none"
    document.getElementById("four").style.display = "none"
    ganador = Math.floor(Math.random() * 20) + 1;
    modo = "victorias"
    console.log(ganador)
}

function contrarreloj(){
    document.getElementById("main").style.display = "none"
    document.getElementById("two").style.display = "none"
    document.getElementById("three").style.display = "block"
    document.getElementById("four").style.display = "none"
    ganador = Math.floor(Math.random() * 50) + 1;
    modo = "contrarreloj"
    empezarReloj()
    console.log(ganador)
}

const crearTabla = () => tabla.innerHTML = `<thead><tr><th>Nombre</th><th>Email</th><th>Procedencia</th><th>${crearCabezal()}</th></tr></thead>`

function crearCabezal(){
    let retorno = modo;
    if(modo == "contrarreloj")retorno = "Tiempo record";
    return retorno;
}

function crearLinks(top5) {
    let li1 = document.createElement("li");
    (modo == "intentos")? tablaIntentos.classList.add("border"):(modo == "contrarreloj")?tablaContrarreloj.classList.add("border"):tablaVs.classList.add("border");
    li1.textContent = "Ver todos"
    let h2;
    let ul;
    (modo == "intentos") ? h2 = h2Single : (modo == "contrarreloj")?h2 = h2ContraR:h2 = h2Vs;
    (modo == "intentos") ? ul = ulSingle : (modo == "contrarreloj")?ul = ulContraR:ul = ulVs;

    h2.innerHTML = "Top 5 Jugadores"
    li1.addEventListener("click", function () {
        h2.innerHTML = "Ganadores de hoy"
        crearTabla();
        if(modo == "intentos") 
        rellenarTabla(ordenarJugadores()) 
        else if(modo == "contrarreloj") 
        rellenaTablaContraR(ordenarJugadores())
        else rellenaTablaVictorias(ordenarJugadores())
    })
    let li2 = document.createElement("li");
    li2.textContent = "Ver top 5"
    li2.addEventListener("click",
        function () {
            h2.innerHTML = "Top 5 jugadores"
            crearTabla();
            if(modo == "intentos") 
            rellenarTabla(top5) 
            else if(modo == "victorias")
             rellenaTablaVictorias(top5)
                else rellenaTablaContraR(top5)
        })

    ul.appendChild(li1)
    ul.appendChild(li2)
}



const listar = (a) => tabla.innerHTML += `<tbody><tr><td>${a.nombre}</td><td>${a.email}</td><td>${a.procedencia}</td><td>${a.intentos}</td></tr></tbody>`
const listarContraR = (a) => tabla.innerHTML += `<tbody><tr><td>${a.nombre}</td><td>${a.email}</td><td>${a.procedencia}</td><td>${a.tiempoRecord}</td></tr></tbody>`
const llenarVs = (a) => tabla.innerHTML += `<tbody><tr><td>${a.nombre}</td><td>${a.email}</td><td>${a.procedencia}</td><td>${a.victorias}</td></tr></tbody>`
const rellenarTabla = (j) => j.forEach(listar);
const rellenaTablaVictorias = (j) => j.forEach(llenarVs)
const rellenaTablaContraR = (j) => j.forEach(listarContraR)

const agregarFelicitaciones = function (texto, elemento) {
    let h3 = document.createElement('h3');
    console.log(texto + ", Elemento: " + elemento)
    h3.innerHTML = texto;
    elemento.appendChild(h3);
}

function mostrarIngreso() {
    (modo == "intentos") ? parrafosMensaje[0].innerHTML = "" :(modo == "victorias")? parrafosMensaje[1].innerHTML = "":parrafosMensaje[2].innerHTML = "";
    document.getElementById("four").style.display = "block";
}



document.querySelector("#btnIngresarJugador").addEventListener("click", consultarJugadorNuevo)
document.querySelector("#txtNombre").addEventListener("input", () => {
    document.querySelector("#tuNombre").textContent = document.querySelector("#txtNombre").value
})


document.getElementById("txtEmail").addEventListener("keydown", function (evt) {
    if (evt.code == "Enter") consultarJugadorNuevo()
})
document.getElementById("txtNombre").addEventListener("keydown", function (evt) {
    if (evt.code == "Enter") consultarJugadorNuevo()
})


function consultarJugadorNuevo() {
    let textoError = "El nombre y correo son mandatorios, revisa los datos por favor."
    nombreJugador = document.querySelector("#txtNombre").value;
    procedenciaJugador = document.querySelector("#txtProcedencia").value;
    emailJugador = document.querySelector("#txtEmail").value
    if (nombreJugador == "" || !validarMail(emailJugador)) {
        (nombreJugador == "") ? document.querySelector("#errorIngreso").innerHTML = textoError : document.querySelector("#errorIngreso").innerHTML = "Ingresa un correo valido por favor";
        document.querySelector("#errorIngreso").classList.add("pError")
        setTimeout(() => {
            document.querySelector("#errorIngreso").classList.remove("pError");
            document.querySelector("#errorIngreso").innerHTML = "";
        }, 3000)
    } else {
        jugadorNuevo.nombre = nombreJugador;
        jugadorNuevo.procedencia = procedenciaJugador;
        jugadorNuevo.email = emailJugador;
        if (modo == "intentos") {
            jugadorNuevo.intentos = intentos;
            if (!existeJugador(jugadorNuevo.email)) {
                jugadorNuevo.victorias = 0;
                jugadorNuevo.tiempoRecord = "";
                jugadores.unshift(jugadorNuevo)
            } else {
                sobrescribirDatos(jugadorNuevo)
            }
        } else if(modo == "victorias") {            
            if (!existeJugador(jugadorNuevo.email)) {
                jugadorNuevo.victorias = 1;
                jugadorNuevo.intentos = 0;
                jugadorNuevo.tiempoRecord = "";
                jugadores.unshift(jugadorNuevo)
            } else {
                sobrescribirDatos(jugadorNuevo);
            }
        }else{
            jugadorNuevo.tiempoRecord = (20 - tiempoInicial).toFixed(2);
            if (!existeJugador(jugadorNuevo.email)) {
                jugadorNuevo.victorias = 0;
                jugadorNuevo.intentos = 0;
                console.log("llega si")
                jugadores.unshift(jugadorNuevo)
            } else {
                sobrescribirDatos(jugadorNuevo)
            }
        }
        sincronizarStorage();
        console.log(localStorage.getItem("jugadores"))

        if(modo == "contrarreloj"){
            document.getElementById("main").style.display = "none"
            document.getElementById("two").style.display = "none"
            document.getElementById("three").style.display = "block"
            document.getElementById("four").style.display = "none"
        }else
        (modo == "intentos") ? singlePlayer() : vsBtn()
        tuResultado(true, `Felicidades ${jugadorNuevo.nombre}, ganaste el partido! `);        
    }
}



function validarMail(email) {
    var chars = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(chars)
}



function ordenarJugadores() {
    let jugadoresOrdenados;
    if(modo == "intentos") 
     jugadoresOrdenados = jugadores.sort((a, b) => a.intentos - b.intentos || a.nombre.localeCompare(b.nombre)).filter((j) => j.intentos > 0) 
    else if(modo == "contrarreloj")jugadoresOrdenados = jugadores.sort((a, b) => a.tiempoRecord - b.tiempoRecord || a.nombre.localeCompare(b.nombre)).filter((j) => j.tiempoRecord > 0) 
    else jugadoresOrdenados = jugadores.sort((a, b) => b.victorias - a.victorias || a.nombre.localeCompare(b.nombre)).filter((j) => j.victorias > 0)    
    return jugadoresOrdenados;
}

function sobrescribirDatos(jugadorEspecifico) {
    obtenerJugador(jugadorEspecifico.email).procedencia = jugadorEspecifico.procedencia;
    obtenerJugador(jugadorEspecifico.email).nombre = jugadorEspecifico.nombre;
    if(modo == "intentos")
    sobrescribirIntentos(jugadorEspecifico);
    else 
    if(modo == "victorias") sobrescribirVictorias(jugadorEspecifico)
    else sobrescribirTiempoR(jugadorEspecifico)
    
}

function sobrescribirIntentos(jugadorEspecifico) {
    if (jugadorEspecifico.intentos < obtenerJugador(jugadorEspecifico.email).intentos) obtenerJugador(jugadorEspecifico.email).intentos = jugadorEspecifico.intentos
}

function sobrescribirVictorias(jugadorEspecifico) {
    obtenerJugador(jugadorEspecifico.email).victorias++;
}

function sobrescribirTiempoR(jugadorEspecifico) {

    if ( obtenerJugador(jugadorEspecifico.email).tiempoRecord == "" || jugadorEspecifico.tiempoRecord < obtenerJugador(jugadorEspecifico.email).tiempoRecord) obtenerJugador(jugadorEspecifico.email).tiempoRecord = jugadorEspecifico.tiempoRecord;
}


function existeJugador(emailJ) {
    let retorno;
    (obtenerJugador(emailJ) != null) ? retorno = true : retorno = false;
    return retorno;
}

function numeroIncorrecto(numero) {
    let n;
    (modo == "intentos") ? n = 1 :(modo == "victorias")? n = 2:n = 4;
    let div = document.getElementsByTagName("div")[n]
    div.classList.remove("diverror")
    div.offsetWidth;
    div.classList.add("diverror")
    if (modo == "intentos") div.onanimationend = () => parrafosMensaje[0].innerHTML = "Incorrecto, te quedan " + (chances - intentos) + " chances. Pista: " + pistaNumero(numero, chances - intentos)
    else if(modo == "victorias") div.onanimationend = () => parrafosMensaje[1].innerHTML = "Sigan participando";
    else div.onanimationend = () => parrafosMensaje[2].innerHTML = pistaNumero(numero,0);
    
    
}

document.querySelector("#boton").addEventListener("click", ingresarNumero)

document.getElementById("numero").addEventListener("keyup", function (evt) {
    if (evt.code == "Enter" && !document.querySelector("#boton").disabled) ingresarNumero()
})

function ingresarNumero() {
    let numero = Number(document.querySelector("#numero").value);

    if (numero > 100 || numero < 1) {
        parrafosMensaje[0].innerHTML = "El número debe estar entre 1 y 100."
        parrafosMensaje[0].classList.add("pError")
        setTimeout(() => {
            parrafosMensaje[0].classList.remove("pError");
            parrafosMensaje[0].innerHTML = "";
        }, 3000)
    } else {
        numerosElegidos.push(numero)
        document.querySelector("#numerosElegidosIntentos").innerHTML = textoNumerosElegidos + [...numerosElegidos]
        for (let i = 0; i <= chances; i++) {
            intentos++;
            if (!consultarNumero(numero)) {
                if (intentos < chances) numeroIncorrecto(numero);
            }
            break;
        }
        if (consultarNumero(numero)) {
            mostrarIngreso()
            document.querySelector("#boton").disabled = true
        } else if (intentos == chances) {
            tuResultado(false, "Lo sentimos, perdiste la partida. El correcto erá: " + ganador + ". ")
            document.querySelector("#boton").disabled = true
        }
    }
}

document.querySelector("#botonVs").addEventListener("click", ingresarNumeroVs)

document.getElementById("tuNumero").addEventListener("keyup", function (evt) {
    if (evt.code == "Enter" && !document.querySelector("#botonVs").disabled) ingresarNumeroVs()
})

document.getElementById("numeroClock").addEventListener("keydown", function (evt) {
    if (evt.code == "Enter" && !document.querySelector("#btnClock").disabled) ingresarNumeroContrarreloj()
})

function ingresarNumeroVs() {
    let tuNumero = Number(document.querySelector("#tuNumero").value);
    if (tuNumero > 20 || tuNumero < 1) {
        parrafosMensaje[1].innerHTML = "El número debe estar entre 1 y 20."
        parrafosMensaje[1].classList.add("pError")
        setTimeout(() => {
            parrafosMensaje[1].classList.remove("pError");
            parrafosMensaje[1].innerHTML = "";
        }, 3000)
    } else {
        numerosElegidos.push(tuNumero)
        if (!Boolean(ganasteTu ^ ganoRival)) {
            while (!noEsta(numeroRival, numerosElegidosRival) || !noEsta(numeroRival, numerosElegidos)) {
                numeroRival = Math.floor(Math.random() * 20) + 1;
            }
            document.querySelector("#numerosElegidosVictoriasTu").innerHTML = textoNumerosElegidos + [numerosElegidos]
            document.querySelector("#respuestaRival").innerHTML = ` ${numeroRival}`
            ganasteTu = consultarNumero(tuNumero)
            ganoRival = consultarNumero(numeroRival)
            numerosElegidosRival.push(numeroRival)
            document.querySelector("#numerosElegidosVictoriasRival").innerHTML = textoNumerosElegidos + [...numerosElegidos]
        }


        if (Boolean(ganasteTu ^ ganoRival)) {
            (ganasteTu) ? mostrarIngreso() : tuResultado(false, "Gano tu Rival. ", "victorias");
            document.querySelector("#botonVs").disabled = true;
        } else {
            (ganasteTu && ganoRival) ? reiniciarJuego() : numeroIncorrecto()
        }


    }

}

function reiniciarJuego() {
    numerosElegidosRival = [];
    document.querySelector("#numerosElegidosVictoriasTu").innerHTML = ""
    document.querySelector("#numerosElegidosVictoriasRival").innerHTML = ""
    ganador = Math.floor(Math.random() * 20) + 1;
    parrafosMensaje[1].innerHTML = "Empataron. Comiencen de nuevo!"

}

function noEsta(num, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == num) return false
    }
    return true
}


function obtenerJugador(emailJugador) {
    for (let i = 0; i < jugadores.length; i++) {
        if (jugadores[i].email == emailJugador) return jugadores[i];
    }
    return null;
}

const consultarNumero = (numero) => numero == ganador;

function pistaNumero(numero, chances) {
    let pista = "";
    if(modo == "intentos"){
    if (chances == 4) {
        switch (true) {
            case ganador % 10 == 0:
                pista = "El numero es múltiplo de 10 y también "
                break;
            case ganador % 5 == 0:
                pista = "El numero es múltiplo de 5 y también "
                break;
            case ganador % 2 == 0:
                pista = "El numero es par y también "
                break;
            case ganador % 2 != 0:
                pista = "El numero es impar y también "
                break;
        }
    } else {
        switch (true) {
            case ganador > 0 && ganador < 16:
                pista = "El numero esta entre 1-15 y es "
                break;
            case ganador > 15 && ganador < 31:
                pista = "El numero esta entre 16-30 y es "
                break;
            case ganador > 30 && ganador < 46:
                pista = "El numero esta entre 31-45 y es "
                break;
            case ganador > 45 && ganador < 61:
                pista = "El numero esta entre 46-60 y es "
                break;
            case ganador > 60 && ganador < 76:
                pista = "El numero esta entre 61-75 y es "
                break;
            case ganador > 75 && ganador < 90:
                pista = "El numero esta entre 76-90 y es "
                break;
            default:
                pista = "El numero es mayor a 90 y es "
        }
    }
    }else{
        pista = "El correcto es ";
    }
    (numero > ganador) ? pista += "menor al número que pusiste." : pista += "mayor al número que pusiste."
    return pista;
}



const figuraEnTop5 = function (objeto, array) {
    let titulo = elemento = "";
    (modo == "intentos") ? titulo = "Estas en primer lugar! Te recomendamos que jueges la quiniela." :(modo == "victorias")? titulo = "Estas en primer lugar! Devolvenos la bola de cristal.":titulo = "Felicidades! Batiste el record."
    if(modo == "intentos")
     elemento = tablaIntentos
    else if(modo == "victorias")
    elemento = tablaVs
    else elemento = tablaContrarreloj;
    if (objeto.email == array[0].email) agregarFelicitaciones(titulo, elemento)
    for (let i = 1; i < array.length; i++)
        if (objeto == array[i]) {
            agregarFelicitaciones('Felicitaciones! Estas en el top 5.', elemento);
            break
        }
}



function tuResultado(victoria, texto) {
    (victoria) ? document.querySelector("#body").classList.add("victoria") : document.querySelector("#body").classList.add("derrota")
    document.querySelector("#botonVs").disabled = true
    let posP;
    (modo == "intentos")? posP = 0:(modo == "contrarreloj")?posP = 2:posP = 1;
    parrafosMensaje[posP].innerHTML = texto + refresca;
    let top5 = ordenarJugadores().slice(0, 5);    
    if (top5.length != 0) {
        crearTabla();
        if(modo == "intentos")
         rellenarTabla(top5) 
        else if(modo == "contrarreloj")
        rellenaTablaContraR(top5)
        else rellenaTablaVictorias(top5);
        
        if(modo == "intentos") tablaIntentos.appendChild(tabla)
        else if(modo == "contrarreloj") tablaContrarreloj.appendChild(tabla)
        else tablaVs.appendChild(tabla);
        figuraEnTop5(jugadorNuevo, top5)
        crearLinks(top5);
    } else {
        (modo == "intentos") ? parrafoListaVacia(tablaIntentos) :(modo == "victorias")? parrafoListaVacia(tablaVs):parrafoListaVacia(tablaContrarreloj);

    }
}

function parrafoListaVacia(elemento) {
    let p = document.createElement("p")
    p.style.color = "white";
    p.textContent = "No hubo ningun ganador hoy"
    elemento.appendChild(p);
}



//#endregion

//#region Objetos
class Jugador {
    constructor(n, e, p, i, v,tr) {
        this.nombre = n,
            this.email = e,
            this.procedencia = p,
            this.intentos = i,
            this.victorias = v,
            this.tiempoRecord = tr

    }
}

let jugadorNuevo = new Jugador()
//#endregion

//#region localstorage

const sincronizarStorage = () => localStorage.setItem("jugadores", JSON.stringify(jugadores))


document.addEventListener('DOMContentLoaded', () => {
    jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];

})

//#endregion

//#region bola

//#endregion