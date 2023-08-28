import { $, tag, llamarToast, mostrarAlertSwal ,volverInicioSwal} from "./librerias.js";


//#region Variables
let { nombreJugador, procedenciaJugador, emailJugador } = "";
let ganador, intentos = 0;
let numeroRival = Math.floor(Math.random() * 20) + 1;
let tabla = document.createElement('table')
let parrafo = document.createElement('p')
let tablaVs = $("tablaVs");
let tablaIntentos = $("tablaIntentos");
let tablaContrarreloj = $("tablaTiempo");
let h2Single = tag(tablaIntentos, "h2", 0)
let h2Vs = tag(tablaVs, "h2", 0)
let h2ContraR = tag(tablaContrarreloj, "h2", 0)
var ganasteTu, ganoRival = false;
let ulSingle = tag(tablaIntentos, "ul", 0);
let ulVs = tag(tablaVs, "ul", 0);
let ulContraR = tag(tablaContrarreloj, "ul", 0);
var jugadores, numerosElegidosRival = new Array();
let parrafosMensaje = document.getElementsByClassName("mensajeResultado")
let countdown = $("reloj30secs")
let numerosElegidos = [];
let chances ;
let refresca;
let textoNumerosElegidos;
let tiempoInicial;
let modo;
let intervalo;
let partidoEnCurso;

//#endregion





//#region Funciones


function empezarReloj() {
    clearInterval(intervalo)
    intervalo = setInterval(actualizarReloj, 10)
}

function actualizarReloj() {
    if (tiempoInicial < 0 || isNaN(tiempoInicial)) {
        tiempoInicial = 'Fin.'
        countdown.classList.remove("timeRunsOut")
        tuResultado(false, "Se te acabo el tiempo. ");
        clearInterval(intervalo)
        $("btnClock").disabled = true;
    } else
        tiempoInicial -= 0.01;
    
    
    (tiempoInicial > 0) ? countdown.innerHTML = tiempoInicial.toFixed(1) : countdown.innerHTML = "Fin"
    if(tiempoInicial < 10.000)
    countdown.classList.add("timeRunsOut")

}

$("btnClock").addEventListener("click", ingresarNumeroContrarreloj)

function ingresarNumeroContrarreloj() {
    let numeroIngresado = Number($("numeroClock").value);
    $("numeroClock").value = "";
    if (numeroIngresado <= 50 && numeroIngresado > 0)
        (numeroIngresado == ganador) ? correctoReloj() : incorrectoReloj(numeroIngresado)
    else {
        llamarToast("El número debe estar entre 1 y 50.")        
    }
    $("numerosElegidosClock").innerHTML = textoNumerosElegidos + [...numerosElegidos]
}

function correctoReloj() {
    clearInterval(intervalo)
    if(tiempoInicial > 0 && tiempoInicial < 10)countdown.classList.remove("timeRunsOut")
    mostrarIngreso(false);
}

function incorrectoReloj(numeroIngresado) {
    numeroIncorrecto(numeroIngresado, 0);
    numerosElegidos.push(numeroIngresado);
}



export const inicio = function () {
    esconderSecciones()
    mostrarSeccion("main")    
    numerosElegidosRival = []
    numerosElegidos = []    
    llamarFetch()    
    ganoRival = false;
    clearInterval(intervalo)
    $("backB").style.display = "none"
    
    resetHTML()
}

function resetHTML(){
    for(let i = 0;i < document.getElementsByClassName("tarjeta").length;i++){
        document.getElementsByClassName("tarjeta")[i].classList.remove("diverror")
    }
    $("body").classList.remove("derrota")
    $("body").classList.remove("victoria")
    for(let i = 0; i < document.getElementsByTagName("input").length;i++)
    tag(document,"input",i).innerHTML = "";
    for(let i = 0;i<document.getElementsByClassName("table-responsive-lg").length;i++){
    tag(document.getElementsByClassName("table-responsive-lg")[i],"ul",0).textContent = ""
    tag(document.getElementsByClassName("table-responsive-lg")[i],"h2",0).textContent = ""
    document.getElementsByClassName("table-responsive-lg")[i].classList.remove("border")
    if(tag(document.getElementsByClassName("table-responsive-lg")[i],"table",0)!=undefined)
    tag(document.getElementsByClassName("table-responsive-lg")[i],"table",0).remove(tabla)        
    if(tag(document.getElementsByClassName("table-responsive-lg")[i],"p",0)!=undefined)
    tag(document.getElementsByClassName("table-responsive-lg")[i],"p",0).remove(parrafo)
    }
    
    $("botonVs").disabled = false;
    $("btnClock").disabled = false;
    $("boton").disabled = false
    for(let i = 0;i<document.getElementsByClassName("mensajeResultado").length;i++)
    document.getElementsByClassName("mensajeResultado")[i].innerHTML = ""
    $("numerosElegidosIntentos").innerHTML = ""
    $("numerosElegidosVictoriasTu").innerHTML = ""
    $("numerosElegidosClock").innerHTML = ""
    $("respuestaRival").innerHTML = ""

}



const mostrarSeccion = (id) => $(id).style.display = "block"

inicio();

$("btnSeccionIntentos").addEventListener("click", singlePlayer)
$("btnSeccionVictorias").addEventListener("click", vsBtn)
$("btnSeccionContrarreloj").addEventListener("click", contrarreloj)

function singlePlayer() {
    esconderSecciones()
    mostrarSeccion("s"+this.getAttribute("id").substring(4,this.length))
    mostrarSeccion("backB")    
    ganador = Math.floor(Math.random() * 100) + 1;
     
    modo = "intentos"
}

function esconderSecciones(){
    for(let s = 0;s < 4;s++)
        tag(document,"section",s).style.display = "none"
    
    
}


function vsBtn() {
    esconderSecciones()
    mostrarSeccion("s"+this.getAttribute("id").substring(4,this.length))
    mostrarSeccion("backB")
    llamarApiUsuariosRandom()
    ganador = Math.floor(Math.random() * 20) + 1;
     console.log(ganador)
    modo = "victorias"
    
}

const volver =function (){
    
    (partidoEnCurso)?volverInicioSwal():inicio()
}

$("volver").addEventListener("click",volver)

$("tuNumero").addEventListener("keyup",function (evt){
    if (evt.key == "Escape")volver()
})
$("numero").addEventListener("keyup",function (evt){
    if (evt.key == "Escape")volver()
})
$("numeroClock").addEventListener("keyup",function (evt){
    if (evt.key == "Escape")volver()
})



function contrarreloj() {
    esconderSecciones()
    mostrarSeccion("s"+this.getAttribute("id").substring(4,this.length))
    mostrarSeccion("backB")
    ganador = Math.floor(Math.random() * 50) + 1;
     
    modo = "contrarreloj"
    empezarReloj()    
}

const crearTabla = () => tabla.innerHTML = `<thead><tr><th>Nombre</th><th>Email</th><th>Procedencia</th><th>${crearCabezal()}</th></tr></thead>`

function crearCabezal() {
    let retorno = modo;
    if (modo == "contrarreloj") retorno = "Tiempo record";
    return retorno;
}



function crearLinks(top5) {
    
    let li1 = document.createElement("li");
    (modo == "intentos") ? tablaIntentos.classList.add("border") : (modo == "contrarreloj") ? tablaContrarreloj.classList.add("border") : tablaVs.classList.add("border");
    li1.innerHTML = "Ver todos"
    let h2;
    let ul;
    (modo == "intentos") ? h2 = h2Single : (modo == "contrarreloj") ? h2 = h2ContraR : h2 = h2Vs;
    (modo == "intentos") ? ul = ulSingle : (modo == "contrarreloj") ? ul = ulContraR : ul = ulVs;
    
    let li2 = document.createElement("li");
    li2.innerHTML = "Ver top 5"    
    ul.appendChild(li1)
    ul.appendChild(li2)    
    h2.innerHTML = "Top 5 Jugadores"
    li1.addEventListener("click", function () {
        h2.innerHTML = "Ganadores de hoy"
        crearTabla();
        if (modo == "intentos")
            rellenarTabla(ordenarJugadores())
        else if (modo == "contrarreloj")
            rellenaTablaContraR(ordenarJugadores())
        else rellenaTablaVictorias(ordenarJugadores())
    })
    li2.addEventListener("click",
        function () {
            h2.innerHTML = "Top 5 jugadores"
            crearTabla();
            if (modo == "intentos")
                rellenarTabla(top5)
            else if (modo == "victorias")
                rellenaTablaVictorias(top5)
            else rellenaTablaContraR(top5)
        })

    
}



const listar = (a) => tabla.innerHTML += `<tbody><tr><td>${a.nombre}</td><td>${a.email}</td><td>${a.procedencia}</td><td>${a.intentos}</td></tr></tbody>`
const listarContraR = (a) => tabla.innerHTML += `<tbody><tr><td>${a.nombre}</td><td>${a.email}</td><td>${a.procedencia}</td><td>${a.tiempoRecord}</td></tr></tbody>`
const llenarVs = (a) => tabla.innerHTML += `<tbody><tr><td>${a.nombre}</td><td>${a.email}</td><td>${a.procedencia}</td><td>${a.victorias}</td></tr></tbody>`
const rellenarTabla = (j) => j.forEach(listar);
const rellenaTablaVictorias = (j) => j.forEach(llenarVs)
const rellenaTablaContraR = (j) => j.forEach(listarContraR)

function mostrarIngreso(error, textoError) {
    
    (modo == "intentos") ? parrafosMensaje[0].innerHTML = "" : (modo == "victorias") ? parrafosMensaje[1].innerHTML = "" : parrafosMensaje[2].innerHTML = "";
    let htmlForm = '<input class="swal2-input" type="text" id="txtNombre" placeholder="Como te llamas?">' + '<input class="swal2-input" type="text" id="txtProcedencia" placeholder="De donde sos?">' + '<input class="swal2-input" type="text" id="txtEmail" placeholder="Escribi tu correo"></input>';
    if (error) htmlForm += '<p style="color: red;">' + textoError + '</p>';
    (async () => {
        const { value: formValues } = await Swal.fire({
            title: "Ganaste! Ingresa tus datos",
            confirmButtonText: 'Ingresar',
            allowOutsideClick: false,
            html: htmlForm
        })
        if (formValues) {
            nombreJugador = $('txtNombre').value;
            procedenciaJugador = $('txtProcedencia').value,
                emailJugador = $('txtEmail').value
            crearJugadorNuevo(true)
        }
    })()
}

function crearJugadorNuevo(victoria) {
    let mensajeError;

    if (nombreJugador == "" || !validarMail(emailJugador)) {
        (nombreJugador == "") ? mensajeError = "El nombre y correo son obligatorios." : mensajeError = "Ingresa un correo valido por favor";
        //     $("errorIngreso").classList.add("pError")
        //     setTimeout(() => {
        //         $("errorIngreso").classList.remove("pError");
        //         $("errorIngreso").innerHTML = "";
        //     }, 3000)
        mostrarIngreso(true, mensajeError);
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
        } else if (modo == "victorias") {
            if (!existeJugador(jugadorNuevo.email)) {
                jugadorNuevo.victorias = 1;
                jugadorNuevo.intentos = 0;
                jugadorNuevo.tiempoRecord = "";
                jugadores.unshift(jugadorNuevo)
            } else {
                sobrescribirDatos(jugadorNuevo);
            }
        } else {
            jugadorNuevo.tiempoRecord = (30 - tiempoInicial).toFixed(2);
            if (!existeJugador(jugadorNuevo.email)) {
                jugadorNuevo.victorias = 0;
                jugadorNuevo.intentos = 0;
                jugadores.unshift(jugadorNuevo)
            } else {
                sobrescribirDatos(jugadorNuevo)
            }
        }
        sincronizarStorage();
      
        if(victoria)tuResultado(true, `Felicidades ${jugadorNuevo.nombre}, ganaste el partido! `);
        
    }
}



function validarMail(email) {
    var chars = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(chars)
}


async function getApi(){
    const res = await fetch('https://randomuser.me/api/')
    //const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = res.json();
    return data;
}

async function llamarApiUsuariosRandom(){    
    cargandoUsuario()
    const user = await getApi();
    convertirUsuario(user)
}

    

function convertirUsuario(user){
    jugadorRival.nombre = user.results[0].name.first + " " + user.results[0].name.last
    jugadorRival.email = user.results[0].email
    jugadorRival.procedencia = user.results[0].location.city + ", " + user.results[0].location.country

     $("rivalNombre").innerHTML = jugadorRival.nombre;
     $("rivalCorreo").innerHTML = jugadorRival.email;
     $("rivalProcedencia").innerHTML = jugadorRival.procedencia;    
    $("rivalImagen").setAttribute("src",user.results[0].picture.large);
}


function cargandoUsuario(){
    $("rivalNombre").innerHTML = "Cargando..."
    $("rivalCorreo").innerHTML = "Cargando..."
    $("rivalProcedencia").innerHTML = "Cargando..."
    $("rivalImagen").setAttribute("src",'./img/Loading_icon.gif')
}

function ordenarJugadores() {
    let jugadoresOrdenados;
    if (modo == "intentos")
        jugadoresOrdenados = jugadores.sort((a, b) => a.intentos - b.intentos || a.nombre.localeCompare(b.nombre)).filter((j) => j.intentos > 0)
    else if (modo == "contrarreloj") jugadoresOrdenados = jugadores.sort((a, b) => a.tiempoRecord - b.tiempoRecord || a.nombre.localeCompare(b.nombre)).filter((j) => j.tiempoRecord > 0)
    else jugadoresOrdenados = jugadores.sort((a, b) => b.victorias - a.victorias || a.nombre.localeCompare(b.nombre)).filter((j) => j.victorias > 0)
    return jugadoresOrdenados;
}

function sobrescribirDatos(jugadorEspecifico) {
    obtenerJugador(jugadorEspecifico.email).procedencia = jugadorEspecifico.procedencia;
    obtenerJugador(jugadorEspecifico.email).nombre = jugadorEspecifico.nombre;
    if (modo == "intentos")
        sobrescribirIntentos(jugadorEspecifico);
    else
        if (modo == "victorias") sobrescribirVictorias(jugadorEspecifico)
        else sobrescribirTiempoR(jugadorEspecifico)

}

function sobrescribirIntentos(jugadorEspecifico) {
    if (jugadorEspecifico.intentos < obtenerJugador(jugadorEspecifico.email).intentos) obtenerJugador(jugadorEspecifico.email).intentos = jugadorEspecifico.intentos
}

function sobrescribirVictorias(jugadorEspecifico) {
    obtenerJugador(jugadorEspecifico.email).victorias++;
}

function sobrescribirTiempoR(jugadorEspecifico) {

    if (obtenerJugador(jugadorEspecifico.email).tiempoRecord == "" || jugadorEspecifico.tiempoRecord < obtenerJugador(jugadorEspecifico.email).tiempoRecord) obtenerJugador(jugadorEspecifico.email).tiempoRecord = jugadorEspecifico.tiempoRecord;
}


function existeJugador(emailJ) {
    let retorno;
    (obtenerJugador(emailJ) != null) ? retorno = true : retorno = false;
    return retorno;
}



function numeroIncorrecto(numero) {
    let n;

    (modo == "intentos") ? n = 1 : (modo == "victorias") ? n = 2 : n = 4;
    let div = document.getElementsByClassName("tarjeta")[n]
    div.classList.remove("diverror")
    div.offsetWidth;
    div.classList.add("diverror")
    if (modo == "intentos") div.onanimationend = () =>  parrafosMensaje[0].innerHTML = "Incorrecto, te quedan " + (chances - intentos) + " chances. Pista: " + pistaNumero(numero, chances - intentos)
    else if (modo == "victorias") div.onanimationend = () => parrafosMensaje[1].innerHTML = "Sigan participando"
    else div.onanimationend = () => parrafosMensaje[2].innerHTML = pistaNumero(numero, 0)


}

$("boton").addEventListener("click", ingresarNumero)

$("numero").addEventListener("keyup", function (evt) {
    if (evt.code == "Enter" && !$("boton").disabled) ingresarNumero()
})

function ingresarNumero() {
    let numero = Number($("numero").value);
    $("numero").value = "";
    if (numero > 100 || numero < 1) 
        llamarToast("El número debe estar entre 1 y 100.")        
     else {        
        numerosElegidos.push(numero)
        $("numerosElegidosIntentos").innerHTML = textoNumerosElegidos + [...numerosElegidos]
        for (let i = 0; i <= chances; i++) {
            intentos++;
            if (!consultarNumero(numero)) {
                if (intentos < chances) numeroIncorrecto(numero);
            }
            break;
        }
        if (consultarNumero(numero)) {
            mostrarIngreso(false)
            $("boton").disabled = true
        } else if (intentos == chances) {
            tuResultado(false, "Lo sentimos, perdiste la partida. El correcto erá: " + ganador + ". ")
            $("boton").disabled = true
        }
    }
}

$("botonVs").addEventListener("click", ingresarNumeroVs)

$("tuNumero").addEventListener("keyup", function (evt) {
    if (evt.code == "Enter" && !$("botonVs").disabled) ingresarNumeroVs()
})

$("numeroClock").addEventListener("keyup", function (evt) {
    if (evt.code == "Enter" && !$("btnClock").disabled) ingresarNumeroContrarreloj()
})



function ingresarNumeroVs() {
    let tuNumero = Number($("tuNumero").value);
    $("tuNumero").value = "";
    if (tuNumero > 20 || tuNumero < 1) 
        llamarToast("El número debe estar entre 1 y 20.")        
     else {        
        numerosElegidos.push(tuNumero)        
        ganasteTu = consultarNumero(tuNumero)
        numeroRival = Math.floor(Math.random() * 20) + 1;        
        ganoRival = consultarNumero(numeroRival)        
        
            if(!ganoRival){
            while (!noEsta(numeroRival, numerosElegidosRival) || !noEsta(numeroRival, numerosElegidos)) {
                numeroRival = Math.floor(Math.random() * 20) + 1;                      
            }
            
                ganoRival = consultarNumero(numeroRival)            
            }else{
                if (Boolean(ganasteTu ^ ganoRival)){ 
                if(ganasteTu) mostrarIngreso(false) 
                else{
                    nombreJugador = jugadorRival.nombre
                    emailJugador = jugadorRival.email
                    procedenciaJugador = jugadorRival.procedencia
                    crearJugadorNuevo(false)                
                    tuResultado(false, "Gano tu Rival. ", "victorias")
                }
                $("botonVs").disabled = true;
                }else{
                    (ganasteTu && ganoRival) ? reiniciarJuego() : numeroIncorrecto()        
                }
                    
            }
            $("numerosElegidosVictoriasTu").innerHTML = textoNumerosElegidos + [numerosElegidos]                        
            numerosElegidosRival.push(numeroRival)
            $("respuestaRival").innerHTML = ` ${[numerosElegidosRival]}`
            // $("numerosElegidosVictoriasRival").innerHTML = textoNumerosElegidos + [...numerosElegidosRival]
        //}


        if (Boolean(ganasteTu ^ ganoRival)) {
            if(ganasteTu) mostrarIngreso(false)
            if(!ganasteTu && ganoRival){                
                nombreJugador = jugadorRival.nombre
                emailJugador = jugadorRival.email
                procedenciaJugador = jugadorRival.procedencia
                crearJugadorNuevo(false)                
                tuResultado(false, "Gano tu Rival. ", "victorias")
            }
            $("botonVs").disabled = true;
        } else {
            (ganasteTu && ganoRival) ? reiniciarJuego() : numeroIncorrecto()
        }


    }

}

function reiniciarJuego() {
    numerosElegidosRival = [];
    numerosElegidos = []
    $("numerosElegidosVictoriasTu").innerHTML = ""   
    $("respuestaRival").innerHTML = "" 
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
    if (modo == "intentos") {
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
    } else {
        pista = "El correcto es ";
    }
    (numero > ganador) ? pista += "menor al número que pusiste." : pista += "mayor al número que pusiste."
    return pista;
}


const figuraEnTop5 = function (objeto, array) {
    let titulo = "";
    (modo == "intentos") ? titulo = "Estas en primer lugar! Te recomendamos que jueges la quiniela." : (modo == "victorias") ? titulo = "Estas en primer lugar! Devolvenos la bola de cristal." : titulo = "Qué velocidad! Batiste el record. "    
    if (objeto.email == array[0].email) mostrarAlertSwal(titulo, true, objeto.nombre)
    for (let i = 1; i < array.length; i++)
        if (objeto == array[i]) {
            mostrarAlertSwal('Estas en el top 5.', true, objeto.nombre);
            break
        }
}



function tuResultado(victoria, texto) {
    partidoEnCurso = false;
    (victoria) ? $("body").classList.add("victoria") : mostrarAlertSwal(texto, false,nombreJugador)
    if (!victoria) $("body").classList.add("derrota")
    $("botonVs").disabled = true
    let posP;
    (modo == "intentos") ? posP = 0 : (modo == "contrarreloj") ? posP = 2 : posP = 1;
    parrafosMensaje[posP].innerHTML = texto + refresca;
    let top5 = ordenarJugadores().slice(0, 5);
    if (top5.length != 0) {
        crearTabla();
        if (modo == "intentos")
            rellenarTabla(top5)
        else if (modo == "contrarreloj")
            rellenaTablaContraR(top5)
        else rellenaTablaVictorias(top5);

        if (modo == "intentos") tablaIntentos.appendChild(tabla)
        else if (modo == "contrarreloj") tablaContrarreloj.appendChild(tabla)
        else tablaVs.appendChild(tabla);
        if(victoria)figuraEnTop5(jugadorNuevo, top5)
        crearLinks(top5);
    } else {
        (modo == "intentos") ? parrafoListaVacia(tablaIntentos) : (modo == "victorias") ? parrafoListaVacia(tablaVs) : parrafoListaVacia(tablaContrarreloj);

    }
}

function parrafoListaVacia(elemento) {    
    parrafo.style.color = "white";
    parrafo.textContent = "No hubo ningun ganador hoy"
    elemento.appendChild(parrafo);
}


function llamarFetch() {
        
    fetch('datos/variables.json')
        .then((respuesta) => {

            return respuesta.json()
        })
        .then((respuesta) => {         
            chances = respuesta.chances
            intentos = respuesta.intentos
            textoNumerosElegidos= respuesta.textoNumerosElegidos
            refresca = respuesta.refresca
            tiempoInicial = respuesta.tiempoInicial
            partidoEnCurso = respuesta.partidoEnCurso
        })
        .catch((error) => console.log(error))
    
        
    
}



//#endregion

//#region Objetos
class Jugador {
    constructor(n, e, p, i, v, tr) {
        this.nombre = n,
            this.email = e,
            this.procedencia = p,
            this.intentos = i,
            this.victorias = v,
            this.tiempoRecord = tr

    }
}

let jugadorNuevo = new Jugador()
let jugadorRival = new Jugador()
//#endregion

//#region localstorage

const sincronizarStorage = () => localStorage.setItem("jugadores", JSON.stringify(jugadores))


document.addEventListener('DOMContentLoaded', () => {
    jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];

})

//#endregion

//#region bola

//#endregion