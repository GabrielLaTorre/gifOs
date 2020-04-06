import { getSearchGifs, getTrendingGifs, getRandomGifs, autocompleteSearch} from "./api.js";
import { handlersObj } from "./handlers.js";
export { switchTeme, mostrarOcultar, printSearchGifs, printTrendingGifs, printRecommendedGifs, switchSearchStyle, printSearchGifsBtn};

function printRecommendedGifs() { 
  const recommendedTitles = handlersObj.recommendedTopics;
  const recommendedCards = handlersObj.randomCards;
  const limitGifs = recommendedTitles.length;
  const titles = handlersObj.titlesGif;
  for (let i = 0; i < recommendedCards.length; i++) {
    const element = recommendedCards[i];
    const indexRandom = Math.floor(Math.random() * limitGifs);
    const input = recommendedTitles[indexRandom];
    titles[i].textContent = `#${input} GIF`;
    const gifObject = getRandomGifs(input);
      gifObject
      .then(obj => obj.data)
      .then(data => {
        const url = data.images.downsized.url;
        element.setAttribute("src", url);
      });
    };
  }


function printSearchGifs() {
  const searchGifs = handlersObj.searchCards;
  const input = handlersObj.searchInput.value;
  const limit = handlersObj.searchCards.length;
  handlersObj.searchSection.style = "display: block";
  const gifData = getSearchGifs(input, limit);
  gifData.then(gifObject => {
    for (let i = 0; i < searchGifs.length; i++) {
      const element = searchGifs[i];
      const src = gifObject[i].images.downsized.url;
      const img = document.createElement("img");
      img.setAttribute("src", src);
      element.insertAdjacentElement("afterbegin", img);
    }
  });
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
      elemento.insertAdjacentElement("afterbegin", img);
    }
  });
}

function switchTeme(e) {
  let night = "/styles/night.css";
  let light = "/styles/day.css";
  let arrow = document.getElementById("arrow");
  let theme = document.getElementById("style");
  if (e.target.id == "day") {
    let logo = document.getElementById("logo");
    handlersObj.searchImg.setAttribute("src", "/images/lupa_inactive.svg");
    logo.setAttribute("src", "/images/logo.png");
    arrow.setAttribute("src", "/images/dropdown.svg");
    theme.setAttribute("href", light);
  } else if (e.target.id == "night") {
    let logo = document.getElementById("logo");
    handlersObj.searchImg.setAttribute("src", "/images/lupa_gray.svg");
    logo.setAttribute("src", "/images/logo_dark.png");
    arrow.setAttribute("src", "/images/whitedown.svg");
    theme.setAttribute("href", night);
  }
}

// ############ SWITCH THEMES ##############

function mostrarOcultar() {
  let oculto = document.getElementById("oculto");
  if (oculto.style.display == "none") {
    oculto.style.display = "flex";
    var them1 = document.getElementById("day");
    var them2 = document.getElementById("night");
    them1.addEventListener("click", switchTeme);
    them2.addEventListener("click", switchTeme);
  } else {
    oculto.style.display = "none";
  }
}

function switchSearchStyle(e){
  const suggestedBar = handlersObj.searchSuggested;
  const suggestedButtons = handlersObj.suggetedButtons;
  const button = handlersObj.searchBtn;
  const img = handlersObj.searchImg;
  let inputValue = e.target.value;
  if (inputValue.length >= 1){
  suggestedBar.style.display = 'flex';
  button.style.background = '#F7C9F3';
  button.style.color = '#110038';
  img.setAttribute('src', '/images/lupa.svg');
  let autocomplete = autocompleteSearch(inputValue);
  autocomplete
  .then(obj => obj.data)
  .then(data => {
    for (let i = 0; i < suggestedButtons.length; i++) {
      const element = suggestedButtons[i];
      const value = data[i].name;
      element.textContent = value;
    }
  })
  } else {
    suggestedBar.style.display = 'none';
    button.style.background = '#E6E6E6';
    button.style.color = '#B4B4B4';
    img.setAttribute('src', '/images/lupa_inactive.svg')
  }
}

function printSearchGifsBtn(e) {
  const input = e.target.textContent;
  console.log(input);
  const searchGifs = handlersObj.searchCards;
  const limit = handlersObj.searchCards.length;
  handlersObj.searchSection.style = "display: block";
  const gifData = getSearchGifs(input, limit);
  gifData.then(gifObject => {
    for (let i = 0; i < searchGifs.length; i++) {
      const element = searchGifs[i];
      const src = gifObject[i].images.downsized.url;
      const img = document.createElement("img");
      img.setAttribute("src", src);
      element.insertAdjacentElement("afterbegin", img);
    }
  });
}