import {handlersObj} from './handlers.js'
import {mostrarOcultar, printTrendingGifs, printSearchGifs, printRecommendedGifs, switchSearchStyle} from './stylesDOM.js';

document.addEventListener("DOMContentLoaded", init);

function init() {
  handlersObj.handlerUl.addEventListener("click", mostrarOcultar);
  handlersObj.searchBtn.addEventListener('click', printSearchGifs);
  handlersObj.searchInput.addEventListener('input', switchSearchStyle)
  printTrendingGifs();
  printRecommendedGifs();
 }
