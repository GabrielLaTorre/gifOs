// import { getSearchGifs, getTrendingGifs, getRandomGifs, autocompleteSearch, getSearchSuggestions} from "./api.js";
// import { handlersObj } from "./handlers.js";
// export { switchTeme, mostrarOcultar, printSearchGifs, printTrendingGifs, printRecommendedGifs, switchSearchStyle, printSearchSuggested};

handlersObj.searchInput.addEventListener('input', switchSearchStyle) // <--- Traido de Index.js
handlersObj.handlerUl.addEventListener("click", mostrarOcultar);
handlersObj.searchBtn.addEventListener('click', printSearchGifs);
handlersObj.suggetedButtons.forEach(btn => {
  const element = btn;
  element.addEventListener('click', printSearchSuggested);
})
const theme = document.getElementById("style");
  sessionStorage.setItem('theme', theme.getAttribute('href'));



function printRecommendedGifs() { 
  const recommendedTitles = handlersObj.recommendedTopics;
  const recommendedCards = handlersObj.randomCards;
  const limitGifs = recommendedTitles.length;
  const titles = handlersObj.titlesGif;
  const moreBtn = handlersObj.moreResultsBtn;
  for (let i = 0; i < recommendedCards.length; i++) {
    const element = recommendedCards[i];
    const indexRandom = Math.floor(Math.random() * limitGifs);
    const input = recommendedTitles[indexRandom];
    const gifObject = apiObj.getRandomGifs(input);
      gifObject
      .then(obj => obj.data)
      .then(data => {
        const url = data.images.downsized.url;
        const gifTitle = createTitle(data.title);
        gifTitle != "" ?
        titles[i].textContent = `#${gifTitle}`
        :titles[i].textContent = `#${input}GIF`;
        element.setAttribute("src", url);
      });
    moreBtn[i].addEventListener('click', () => {printMoreResults(input)});
    };
  }


function printSearchGifs() {
  cleanSearchGifs();
  const searchTitle = handlersObj.searchTitle;
  const recommendedSection = handlersObj.recommendedSection;
  const searchGifs = handlersObj.searchCards;
  const input = handlersObj.searchInput.value;
  const suggestedBar = handlersObj.searchSuggested;
  const limit = handlersObj.searchCards.length;
  handlersObj.searchSection.style.display = "block";
  recommendedSection.style.display = 'none';
  searchTitle.innerText = `${input} (resultados)`;
  const gifData = apiObj.getSearchGifs(input, limit);
  gifData.then(gifObject => {
    for (let i = 0; i < searchGifs.length; i++) {
      const element = searchGifs[i];
      const src = gifObject[i].images.downsized.url;
      const img = document.createElement("img");
      img.setAttribute("src", src);
      element.insertAdjacentElement("afterbegin", img);
    }
  });
  printTagsButton(input);
  suggestedBar.style.display = 'none';
}

function printTrendingGifs() {
  const trendingCards = handlersObj.trendCards;
  const trendingObj = apiObj.getTrendingGifs();
  trendingObj.then(data => {
    for (let i = 0; i < trendingCards.length; i++) {
      const src = data[i].images.downsized.url;
      const title = data[i].title;
      const tagsArr = title.split(' ', 4);
      const elemento = trendingCards[i];
      const tagDiv = elemento.getElementsByTagName('div')[0];
      const img = document.createElement("img");
      img.setAttribute("src", src);
      elemento.insertAdjacentElement("afterbegin", img);
      tagsArr.forEach(element => {
          const tag = element;
          const tagSpn = document.createElement('span');
          tagSpn.textContent = `#${tag} `;
          tagDiv.insertAdjacentElement('beforeend', tagSpn);
      }
    )
    }
  });
}

function switchTeme(e) {
  const night = "/styles/night.css";
  const light = "/styles/day.css";
  const arrow = document.getElementById("arrow");
  const theme = document.getElementById("style");
  const logo = document.getElementById("logo");
  if (e.target.id == "day") {
    theme.setAttribute('href', light);
    logo.setAttribute("src", "/images/logo.png");
    arrow.setAttribute("src", "/images/dropdown.svg");
    handlersObj.searchImg.setAttribute("src", "/images/lupa_inactive.svg");
    sessionStorage.setItem('theme', theme.getAttribute('href'));
  } else if (e.target.id == "night") {
    theme.setAttribute('href', night);
    logo.setAttribute("src", "/images/logo_dark.png");
    arrow.setAttribute("src", "/images/whitedown.svg");
    handlersObj.searchImg.setAttribute("src", "/images/lupa_gray.svg");
    sessionStorage.setItem('theme', theme.getAttribute('href'));
  }
}

function mostrarOcultar() {
  let oculto = document.getElementById("oculto");
  if (oculto.style.display == "none") {
    oculto.style.display = "flex";
    const them1 = document.getElementById("day");
    const them2 = document.getElementById("night");
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
  let autocomplete =  apiObj.autocompleteSearch(inputValue);
  autocomplete
  .then(obj => obj.data)
  .then(data => {
    console.log(data)
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

function printSearchSuggested(e) {
  cleanSearchGifs();
  const searchTitle = handlersObj.searchTitle;
  const suggestedBar = handlersObj.searchSuggested;
  const recommendedSection = handlersObj.recommendedSection;
  const input = e.target.textContent;
  const searchGifs = handlersObj.searchCards;
  const limit = handlersObj.searchCards.length;
  recommendedSection.style.display = 'none';
  handlersObj.searchSection.style.display = "block";
  searchTitle.innerText = `${input} (resultados)`;
  const gifData = apiObj.getSearchGifs(input, limit);
  gifData.then(gifObject => {
    for (let i = 0; i < searchGifs.length; i++) {
      const element = searchGifs[i];
      const src = gifObject[i].images.downsized.url;
      const img = document.createElement("img");
      img.setAttribute("src", src);
      element.insertAdjacentElement("afterbegin", img);
    }
  });
  printTagsButton(input);
  suggestedBar.style.display = 'none';
}

function cleanSearchGifs(){
  const searchGifs = handlersObj.searchCards;
  for (let i = 0; i < searchGifs.length; i++) {
    const element = searchGifs[i];
    while(element.firstChild){
      element.removeChild(element.firstChild);
    }
  }
}

function printTagsButton(input){
  const tagBtns = handlersObj.tagButtons;
  const tags = handlersObj.suggestedTags;
  const topic = apiObj.getSearchSuggestions(input);
  topic.then(data => {
    for (let i = 0; i < tags.length; i++) {
      const element = tags[i];
      element.innerText = `${data[i].name}`;
      tagBtns[i].style.display = 'inline';
      element.addEventListener('click', printSearchSuggested);
    }
  })
}

function printMoreResults(input) {
  cleanSearchGifs();
  const searchTitle = handlersObj.searchTitle;
  const suggestedBar = handlersObj.searchSuggested;
  const recommendedSection = handlersObj.recommendedSection;
  const searchGifs = handlersObj.searchCards;
  const limit = handlersObj.searchCards.length;
  recommendedSection.style.display = 'none';
  handlersObj.searchSection.style.display = "block";
  searchTitle.innerText = `${input} (resultados)`;
  const gifData = apiObj.getSearchGifs(input, limit);
  gifData.then(gifObject => {
    for (let i = 0; i < searchGifs.length; i++) {
      const element = searchGifs[i];
      const src = gifObject[i].images.downsized.url;
      const img = document.createElement("img");
      img.setAttribute("src", src);
      element.insertAdjacentElement("afterbegin", img);
    }
  });
  printTagsButton(input);
  suggestedBar.style.display = 'none';
}

function createTitle(input) {
  const arrStr = input.split(" ", 3);
  const newArr = [];
  arrStr.forEach(element => {
      const texto = element.charAt(0).toUpperCase() + element.slice(1);
      newArr.push(texto);
  });
  return newArr.join("");
}