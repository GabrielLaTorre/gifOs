import {handlersObj} from './handlers.js'
import {mostrarOcultar, printTrendingGifs, printSearchGifs, printRecommendedGifs, switchSearchStyle, printSearchSuggested} from './stylesDOM.js';

document.addEventListener("DOMContentLoaded", init);

function init() {
  const theme = document.getElementById("style");
  sessionStorage.setItem('theme', theme.getAttribute('href'));
  handlersObj.handlerUl.addEventListener("click", mostrarOcultar);
  handlersObj.searchBtn.addEventListener('click', printSearchGifs);
  handlersObj.searchInput.addEventListener('input', switchSearchStyle)
  handlersObj.suggetedButtons.forEach(btn => {
    const element = btn;
    element.addEventListener('click', printSearchSuggested);
  })
  printTrendingGifs();
  printRecommendedGifs();
 }
