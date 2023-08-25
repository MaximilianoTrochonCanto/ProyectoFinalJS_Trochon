import { inicio } from "./codigo.js";

export const $ = (id) => document.getElementById(id);

export const tag = (el,tag,n) => el.getElementsByTagName(tag)[n];

export function mostrarAlertSwal(texto, victoria,nombreJugador) {
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

export function llamarToast(texto){

    Toastify({

    text: texto,
    duration: 5000,
    close: true,
    position:"center",
    style: {
        background: `linear-gradient(to right, red, darkred)`,
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
