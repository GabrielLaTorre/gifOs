import {handlersObj} from './handlers.js'
import {getTrendingGifs, getRandomGifs, getSearchGifs} from './api.js'
import {mostrarOcultar, printGifs} from './stylesDOM.js';

document.addEventListener("DOMContentLoaded", init);

function init() {
  handlersObj.handlerUl.addEventListener("click", mostrarOcultar);
  //getTrendingGifs();
  getRandomGifs();
 }

 handlersObj.searchBtn.addEventListener('click', printGifs);