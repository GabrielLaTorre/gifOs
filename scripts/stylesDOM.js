import {getSearchGifs} from './api.js';
import {searchImg, searchCards, searchSection} from './handlers.js';
export {switchTeme, mostrarOcultar, printGifs, createTitle}

function printGifs() {
  searchSection.style = 'display: block';
  let gifData = getSearchGifs();
  gifData.then(gifObject =>{
    for (let i = 0; i < searchCards.length; i++) {
      const element = searchCards[i];
      let src = gifObject[i].images.downsized.url;
      let img = document.createElement('img');
      img.setAttribute('src', src);
      element.insertAdjacentElement('afterbegin', img);
    }
  })
}


function switchTeme(e) {
    let night = '/styles/night.css';
    let light = '/styles/day.css';
    let arrow = document.getElementById('arrow');
    let theme = document.getElementById('style');
    if (e.target.id == 'day') {
      let logo = document.getElementById('logo');
      searchImg.setAttribute('src', '/images/lupa_inactive.svg')
      logo.setAttribute('src', '/images/logo.png');
      arrow.setAttribute('src', '/images/dropdown.svg');
      theme.setAttribute('href', light);
    } 
    else if (e.target.id == 'night') {;
      let logo = document.getElementById('logo');
      searchImg.setAttribute('src', '/images/lupa_gray.svg')
      logo.setAttribute('src', '/images/logo_dark.png');
      arrow.setAttribute('src', '/images/whitedown.svg');
      theme.setAttribute('href', night);
    }  
  }
  
  // ############ SWITCH THEMES ##############
  
  
  function mostrarOcultar() {
    let oculto = document.getElementById("oculto");
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
  
  function createTitle(title) {
    var result = [];
    var newTitle = title.split(' ');
    for (let i = 0; i < 3; i++) {
      const element = newTitle[i];
      result.push(element);
    }
    return result.toString();
  }