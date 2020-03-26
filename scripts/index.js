import {handlerUl, searchBtn, searchCards, searchSection, inputController} from './handlers.js'
import {getTrendingGifs, getRandomGifs, getSearchGifs} from './api.js'
import {mostrarOcultar} from './stylesDOM.js';

document.addEventListener("DOMContentLoaded", init);

function printGifs() {
  inputController()
  searchSection.style = 'display: block';
  let promise = getSearchGifs();
  promise.then(randomResults =>{
    for (let i = 0; i < searchCards.length; i++) {
      const element = searchCards[i];
      let src = randomResults[i].images.downsized.url;
      let img = document.createElement('img');
      img.setAttribute('src', src);
      element.insertAdjacentElement('afterbegin', img);
    }
  })
}

function init() {
  handlerUl.addEventListener("click", mostrarOcultar);
  searchBtn.addEventListener('click', printGifs);
  getTrendingGifs();
  getRandomGifs();
 }