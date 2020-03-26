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