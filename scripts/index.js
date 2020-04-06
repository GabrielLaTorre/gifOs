import {handlersObj} from './handlers.js'
import {mostrarOcultar, printTrendingGifs, printSearchGifs, printRecommendedGifs, switchSearchStyle, printSearchGifsBtn} from './stylesDOM.js';

document.addEventListener("DOMContentLoaded", init);

function init() {
  handlersObj.handlerUl.addEventListener("click", mostrarOcultar);
  handlersObj.searchBtn.addEventListener('click', printSearchGifs);
  handlersObj.searchInput.addEventListener('input', switchSearchStyle)
  handlersObj.suggetedButtons.forEach(btn => {
    const element = btn;
    element.addEventListener('click', printSearchGifsBtn);
  })
  printTrendingGifs();
  printRecommendedGifs();
 }
