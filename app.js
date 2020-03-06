import * as api from "./api.js";

document.addEventListener("DOMContentLoaded", init);

function switchTeme(e) {
  let dark = 'dark.css';
  let light = 'styles.css'
  var theme = document.getElementById('style');
  if (e.target.id == 'day') {
    var logo = document.getElementById('logo');
    logo.setAttribute('src', '/images/logo.png')
    theme.setAttribute('href', light);
  } 
  else if (e.target.id == 'night') {;
    var logo = document.getElementById('logo');
    logo.setAttribute('src', '/images/logo_dark.png')
    theme.setAttribute('href', dark);
  }  
}




function init() { 

  var trending = document.getElementsByClassName("trend-card");
  api.getTrending;


  var cards = [];
  var uno = document.getElementById("rec-1");
  var dos = document.getElementById("rec-2");
  var tres = document.getElementById("rec-3");
  var cuatro = document.getElementById("rec-4");
  cards.push(uno,dos,tres,cuatro);

cards.forEach(element => {
  api.getRandomCards;
})

// ############ SWITCH THEMES ##############

var ocultar = document.getElementById("ocultar");
var oculto = document.getElementById("oculto");
ocultar.addEventListener("click", mostrarOcultar);

function mostrarOcultar() {
  if (oculto.style.display == "none") {
    oculto.style.display = "flex";
    var them1 = document.getElementById('day');
    var them2 = document.getElementById('night');
    them1.addEventListener("click", switchTeme);
    them2.addEventListener("click", switchTeme);
  } else {
    oculto.style.display = "none";
  }
}
}
