import {searchBtn, searchCards, searchSection, inputController} from './handlers.js'
import {getTrendingGifs, getRandomGifs, getSearchGifs} from './api.js'

document.addEventListener("DOMContentLoaded", init);

function printGifs() {
  inputController()
  searchSection.style = 'display: block';
  var promise = getSearchGifs();
  promise.then(randomResults =>{
    for (let i = 0; i < searchCards.length; i++) {
      const element = searchCards[i];
      var src = randomResults[i].images.downsized.url;
      let img = document.createElement('img');
      img.setAttribute('src', src);
      element.insertAdjacentElement('afterbegin', img);
    }
  })
}

function init() {  
  searchBtn.addEventListener('click', printGifs);
  getTrendingGifs();
  getRandomGifs();
 }

/*
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

*/