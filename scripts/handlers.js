export var randomCards = [];
var recImgs = document.getElementsByClassName('rec-gif');
for (let i = 0; i < recImgs.length; i++) {
    const element = recImgs[i];
    randomCards.push(element);
}

export var titlesGif = [];
var titles = document.getElementsByClassName('gif-title');
for (let i = 0; i < titles.length; i++) {
    const element = titles[i];
    titlesGif.push(element);
}

export var searchBtn = document.getElementById("search-btn");
export var searchSection = document.getElementById("search-results");
export var searchImg = document.getElementById('search-img');

export var searchCards = [];
var elements = document.getElementsByClassName('search-card');
for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    searchCards.push(element);
}

export var handlerUl = document.getElementById("handler-ul");