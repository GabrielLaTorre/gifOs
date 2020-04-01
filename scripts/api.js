import {handlersObj} from './handlers.js';
export {getTrendingGifs, getRandomGifs, getSearchGifs};

const apiKey = "lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw";

function getTrendingGifs() {
  const found = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10&rating=G`)
     .then(res => res.json())
     .then(obj => obj.data)
     .then(data => {
       return data;
     })
     .catch(e => console.log(e));
     return found;
   }

   function getRandomGifs() {
    handlersObj.randomCards.forEach(element => {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=G`)
    .then(response => response.json())
    .then(content => {
      let {data:{images:{downsized:{url}}}} = content;
      let img = element;
      img.setAttribute('src', url);
    })
    .catch(err => console.log(err))
    })
}


function getSearchGifs(input) {
  const found = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input}&limit=10&offset=0&rating=G&lang=en`)
  .then(response => response.json())
  .then(content => content.data)
  .then(data => {
    return data;
  })
  .catch(err => console.log(err))
  return found;
}