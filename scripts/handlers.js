export var randomCards = [];
var uno = document.getElementById("rec-1");
var dos = document.getElementById("rec-2");
var tres = document.getElementById("rec-3");
var cuatro = document.getElementById("rec-4");
randomCards.push(uno,dos,tres,cuatro);

export var searchBtn = document.getElementById("boton");
export var searchSection = document.getElementById("search-results");

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