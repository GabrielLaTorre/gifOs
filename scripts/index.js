import {handlersObj} from './handlers.js'
import {getTrendingGifs, getRandomGifs, getSearchGifs} from './api.js'
import {mostrarOcultar, printTrendingGifs, printSearchGifs} from './stylesDOM.js';

document.addEventListener("DOMContentLoaded", init);

function init() {
  handlersObj.handlerUl.addEventListener("click", mostrarOcultar);
  handlersObj.searchBtn.addEventListener('click', printSearchGifs);
  printTrendingGifs();
  // getRandomGifs();
 }

 const tags = printTags();
 tags
 .then(tag => console.log(tag));
 function printTags(){
   const found = fetch(`https://api.giphy.com/v1/tags/related/{hola}?api_key=lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw`)
   .then(data => data.json())
   .then(content => {return content})
   .catch(e => console.log(e))
   return found;
 }