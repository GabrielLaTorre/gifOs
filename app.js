 var apiKey = "lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw";
 var cards = [];
 var uno = document.getElementsByTagName('#rec-1');
 cards.push(uno);
 console.log(cards);
document.addEventListener("DOMContentLoaded", init);

function init() {

  // ############ ENDPOINT DE RANDOM ##############
  /*fetch('https://api.giphy.com/v1/gifs/random?api_key=lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw&tag=&rating=G')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err))

  

  // ############ ENDPOINT DE SEARCH ##############

  /*  document.getElementById("boton").addEventListener("click", ev => {
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
  }); */
}