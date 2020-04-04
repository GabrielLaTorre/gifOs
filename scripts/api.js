export {getTrendingGifs, getRandomGifs, getSearchGifs, autocompleteSearch};

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

   function getRandomGifs(input) {
    const found =
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${input}&rating=G`)
    .then(response => response.json())
    .then(content => content)
    .catch(err => console.log(err))
    return found;
}


function getSearchGifs(input, limit) {
  const found = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input}&limit=${limit}&offset=0&rating=G&lang=en`)
  .then(response => response.json())
  .then(content => content.data)
  .then(data => {
    return data;
  })
  .catch(err => console.log(err))
  return found;
}

function autocompleteSearch(input){
  const found = fetch(`https:api.giphy.com/v1/gifs/search/tags?q=${input}&api_key=lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw&limit=3`)
  .then(data => data.json())
  .then(content => {return content})
  .catch(e => console.log(e))
  return found;
}