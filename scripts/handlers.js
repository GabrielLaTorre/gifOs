export const handlersObj = {
    searchBtn: document.getElementById("search-btn"),
    searchSection: document.getElementById("search-results"),
    searchImg: document.getElementById('search-img'),

    handlerUl: document.getElementById("handler-ul"),
    searchInput: document.getElementById("input"),
    randomCards: [],
    titlesGif: [],
    searchCards: [],
    trendCards: document.getElementsByClassName("trend-card"), 
    recommendedTopics: [
        'Deadpool',
        'Pikachu',
        'Sailor Moon',
        'lol',
        'Naruto',
        'Boca Juniors',
        'Developer',
        'Kiss',
        'Rock',
        'Game',
      ]
}

var recImgs = document.getElementsByClassName('rec-gif');
for (let i = 0; i < recImgs.length; i++) {
    const element = recImgs[i];
    handlersObj.randomCards.push(element);
}

var titles = document.getElementsByClassName('gif-title');
for (let i = 0; i < titles.length; i++) {
    const element = titles[i];
    handlersObj.titlesGif.push(element);
}

var elements = document.getElementsByClassName('search-card');
for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    handlersObj.searchCards.push(element);
}

