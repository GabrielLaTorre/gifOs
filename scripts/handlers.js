export var randomCards = [];
var uno = document.getElementById("rec-gif1");
var dos = document.getElementById("rec-gif2");
var tres = document.getElementById("rec-gif3");
var cuatro = document.getElementById("rec-gif4");
randomCards.push(uno,dos,tres,cuatro);

export var searchBtn = document.getElementById("search-btn");
export var searchSection = document.getElementById("search-results");
export var searchImg = document.getElementById('search-img');

export var searchCards = [];
var elements = document.getElementsByClassName('search-card');
for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    searchCards.push(element);
}

export function inputController() {
    let input = document.getElementById('input');
    if(input.value != ''){
        console.log('Estan escribiendo');
    }
}


export var handlerUl = document.getElementById("handler-ul");