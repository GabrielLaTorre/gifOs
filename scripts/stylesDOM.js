import {getSearchGifs, getTrendingGifs} from './api.js';
import {handlersObj} from './handlers.js';
export {switchTeme, mostrarOcultar, printTrendingGifs}

function printGifs() {
  const searchGifs = handlersObj.searchCards
  const input = handlersObj.searchInput.value;
  handlersObj.searchSection.style = 'display: block';
  const gifData = getSearchGifs(input);
  gifData.then(gifObject =>{
    console.log(gifObject);
     for (let i = 0; i < searchGifs.length; i++) {
       const element = searchGifs[i];
       const src = gifObject[i].images.downsized.url;
       const img = document.createElement('img');
       img.setAttribute('src', src);
       element.insertAdjacentElement('afterbegin', img);
     }
  })
}

function printTrendingGifs() {
  const trending = handlersObj.trendCards;
  const trendingObj = getTrendingGifs();
  trendingObj.then(data => {
    for (let i = 0; i < trending.length; i++) {
      var src = data[i].images.downsized.url;
      var elemento = trending[i];
      var img = document.createElement("img");
      img.setAttribute("src", src);
      elemento.insertAdjacentElement("afterbegin", img)
  }})
}


function switchTeme(e) {
    let night = '/styles/night.css';
    let light = '/styles/day.css';
    let arrow = document.getElementById('arrow');
    let theme = document.getElementById('style');
    if (e.target.id == 'day') {
      let logo = document.getElementById('logo');
      handlersObj.searchImg.setAttribute('src', '/images/lupa_inactive.svg')
      logo.setAttribute('src', '/images/logo.png');
      arrow.setAttribute('src', '/images/dropdown.svg');
      theme.setAttribute('href', light);
    } 
    else if (e.target.id == 'night') {;
      let logo = document.getElementById('logo');
      handlersObj.searchImg.setAttribute('src', '/images/lupa_gray.svg')
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
  

///////////////////////////////////////////////////////////////////
/////////// FUNCION CREADA PARA CORTAR EL TÍTULO QUE TRAEN LOS GIFS

  // function createTitle(title) {
  //   var result = [];
  //   var newTitle = title.split(' ');
  //   for (let i = 0; i < 3; i++) {
  //     const element = newTitle[i];
  //     result.push(element);
  //   }
  //   return result.toString();
  // }