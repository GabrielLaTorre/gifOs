import {randomCards, searchCards, searchSection} from './handlers.js';
export {getTrendingGifs, getRandomGifs, getSearchGifs};

const apiKey = "lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw";

function getTrendingGifs() {
  var trending = document.getElementsByClassName("trend-card");
  fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10&rating=G`)
     .then(res => res.json())
     .then(obj => obj.data)
     .then(data => {
       for (let i = 0; i < trending.length; i++) {
         var src = data[i].images.downsized.url;
         var elemento = trending[i];
         var img = document.createElement("img");
         img.setAttribute("src", src);
         elemento.insertAdjacentElement("afterbegin", img)
     }
     })
     .catch(e => console.log(e));
   }

   function getRandomGifs() {
    randomCards.forEach(element => {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=G`)
    .then(response => response.json())
    .then(content => {
      var src = content.data.images.downsized.url;
      let img = document.createElement('img');
      img.setAttribute('src', src);
      element.insertAdjacentElement("beforeend", img);
    })
    .catch(err => console.log(err))
    })
}

  function getSearchGifs() {
    let searchInput = document.getElementById("input").value;
    const found = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput}&limit=10&offset=0&rating=G&lang=en`)
      .then(response => response.json())
      .then(content => content.data)
      .then(data => {
        return data
      })
      .catch(error => {
        console.log(error);
      });
      return found;
  }
  
//  function getRandomCards(element) {
//     fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=G`)
//     .then(response => response.json())
//     .then(content => {
//       var src = content.data.images.downsized.url;
//       let img = document.createElement('img');
//       img.setAttribute('src', src);
//       element.insertAdjacentElement("beforeend", img);
//     })
//     .catch(err => console.log(err))
// }


/* 
// ############ ENDPOINT DE TRENDING ##############
var trending = document.getElementsByClassName("trend-card");
fetch(
  `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10&rating=G`
)
  .then(res => res.json())
  .then(obj => obj.data)
  .then(data => {
    for (let i = 0; i < trending.length; i++) {
      var src = data[i].images.downsized.url;
      var elemento = trending[i];
      var img = document.createElement("img");
      img.setAttribute("src", src);
      elemento.insertAdjacentElement("afterbegin", img)
  }
  })
  .catch(e => console.log(e));


// ############ ENDPOINT DE RANDOM ##############

var cards = [];
var uno = document.getElementById("rec-1");
var dos = document.getElementById("rec-2");
var tres = document.getElementById("rec-3");
var cuatro = document.getElementById("rec-4");
cards.push(uno,dos,tres,cuatro);


cards.forEach(element => {
  fetch('https://api.giphy.com/v1/gifs/random?api_key=lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw&tag=&rating=G')
  .then(response => response.json())
  .then(content => {
    var src = content.data.images.downsized.url;
    let img = document.createElement('img');
    img.setAttribute('src', src);
    element.insertAdjacentElement("beforeend", img);
  })
  .catch(err => console.log(err))
});



// ############ ENDPOINT DE SEARCH ##############

    document.getElementById("boton").addEventListener("click", ev => {
    ev.preventDefault();
    var search = document.getElementById('input').value;
    fetch(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}`)
      .then(response => response.json() )
      .then(content => {
        var src = content.data[0].images.downsized.url;
        let img = document.createElement('img');
        let contenedor = document.getElementById('tendencias');
        img.setAttribute('src', src);
        contenedor.insertAdjacentElement('afterbegin', img);
      })
      .catch(error => {
        console.log(error);
      });
  }); 
}
*/
