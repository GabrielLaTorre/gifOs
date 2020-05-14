// import {handlersObj} from './handlers.js'
// import {mostrarOcultar, printTrendingGifs, printSearchGifs, printRecommendedGifs, switchSearchStyle, printSearchSuggested} from './stylesDOM.js';

document.addEventListener("DOMContentLoaded", init);

function init() {
  renderedGuifos()
  printTrendingGifs();
  printRecommendedGifs();
 }
