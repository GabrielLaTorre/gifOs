var arr_tendencias = [];

arr_tendencias.push(document.getElementsByClassName('ten-uno'));
console.log(arr_tendencias[0]);



/* var apiKey = "lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw";

document.addEventListener("DOMContentLoaded", init);

function init() {
    
    document.getElementById("boton").addEventListener("click", ev => {
    ev.preventDefault();
    var search = document.getElementById('input').value;
    fetch(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}`)
      .then(response => response.json() )
      .then(content => {
        var src = content.data[0].images.downsized.url;
        let img = document.createElement('img');
        let contenedor = document.getElementById('contenido');
        img.setAttribute('src', src);
        contenedor.insertAdjacentElement('afterbegin', img);
      })
      .catch(error => {
        console.log(error);
      });
  });
}
*/