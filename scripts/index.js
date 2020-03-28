import {handlerUl, searchBtn} from './handlers.js'
import {getTrendingGifs, getRandomGifs, getSearchGifs} from './api.js'
import {mostrarOcultar, printGifs} from './stylesDOM.js';

document.addEventListener("DOMContentLoaded", init);

function init() {
  handlerUl.addEventListener("click", mostrarOcultar);
  searchBtn.addEventListener('click', printGifs);
  getTrendingGifs();
  getRandomGifs();
 }