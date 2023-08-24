import { inicio } from "./codigo.js";

export const $ = (id) => document.getElementById(id);

export const tag = (el,tag,n) => el.getElementsByTagName(tag)[n];

export function mostrarAlertSwal(texto, victoria) {
    let titulo;
    let imagen;
    if (victoria) {
        titulo = "Felicidades " + nombreJugador + "!";
        imagen = 'success';
    } else {
        titulo = "Oops"
        imagen = 'error'
    }
    Swal.fire({
        icon: imagen,
        title: titulo,
        text: texto,
    })
}

export function llamarToast(texto,finalidad){
let duracion;
let color1
let color2
if(finalidad=="pista"){
color1 = "skyblue"
color2 = "greenyellow"
}else{
color2 = "red"
color1 = "darkred"
}



(finalidad=="pista")?duracion = 15000:duracion = 3000
 

    Toastify({

    text: texto,
    duration: duracion,
    position:"center",
    style: {
        background: `linear-gradient(to right, ${color1}, ${color2})`,
      },
    
    }).showToast();

}
 
export function volverInicioSwal(){
    
    Swal.fire({
        icon:"question",
        title:"Deseas volver al inicio?",
        showCancelButton:true,
        confirmButtonText:"Si",
        cancelButtonText:"Cancelar"
    }).then((result)=> {
        if(result.isConfirmed)inicio();

    })
}
