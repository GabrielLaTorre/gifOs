const handlersObj = {
    searchBtn: document.getElementById("search-btn"),
    searchSection: document.getElementById("search-results"),
    searchImg: document.getElementById('search-img'),
    searchInput: document.getElementById("input"),
    searchSuggested: document.getElementById('search-options'),
    searchTitle: document.getElementById('search-title'),
    toMisGuifos : document.getElementById('toMisGuifos'),
    suggetedButtons:[],
    suggestedTags: [],
    tagButtons: [],
    moreResultsBtn: [],

    handlerUl: document.getElementById("handler-ul"),
    randomCards: [],
    titlesGif: [],
    searchCards: [],
    trendCards: document.getElementsByClassName("trend-card"), 
    recommendedSection: document.getElementById('recommended'),
    recommendedTopics: [
        'Deadpool',
        'Pokemon',
        'SailorMoon',
        'LOL',
        'Naruto',
        'CSI',
        'Developer',
        'Kiss',
        'Rock',
        'Videogame',
        'Alone',
        'Sad',
        'Friends',
        'PornFood',
        'Holywood',
        'Terminator',
        'Surprise',
        'Football',
        'NBA'
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

var buttons = document.getElementsByClassName('option-button');
for (let i = 0; i < buttons.length; i++) {
    const element = buttons[i];
    handlersObj.suggetedButtons.push(element);
}

var tags = document.getElementsByClassName('spn-tag');
for (let i = 0; i < tags.length; i++) {
    const element = tags[i];
    handlersObj.suggestedTags.push(element);
}

var tagButton = document.getElementsByClassName('btn-tag');
for (let i = 0; i < tagButton.length; i++) {
    const element = tagButton[i];
    handlersObj.tagButtons.push(element);
}

var moreBtns = document.getElementsByClassName('btn-more');
for (let i = 0; i < moreBtns.length; i++) {
    const element = moreBtns[i];
    handlersObj.moreResultsBtn.push(element);
}