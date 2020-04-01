import {handlersObj} from './handlers.js'
import {getTrendingGifs, getRandomGifs, getSearchGifs} from './api.js'
import {mostrarOcultar, printTrendingGifs} from './stylesDOM.js';

document.addEventListener("DOMContentLoaded", init);

function init() {
  handlersObj.handlerUl.addEventListener("click", mostrarOcultar);
  // handlersObj.searchBtn.addEventListener('click', printGifs);
  printTrendingGifs();
  getRandomGifs();
 }

 