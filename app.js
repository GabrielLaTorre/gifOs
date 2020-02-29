const apiKey = "lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw";
 
document.addEventListener("DOMContentLoaded", init);


function init() {
  var ocultar = document.getElementById('ocultar')
  ocultar.addEventListener("click", ocult, true);

  function ocult(event) {
    var oculto = document.getElementById('oculto');
    oculto.style.display = "none";
    event.preventDefault();

  }
}
/*
  var cards = [];
  var uno = document.getElementById("rec-1");
  var dos = document.getElementById("rec-2");
  var tres = document.getElementById("rec-3");
  var cuatro = document.getElementById("rec-4");
  cards.push(uno,dos,tres,cuatro);
 
  // ############ ENDPOINT DE RANDOM ##############

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
*/



// ############ ENDPOINT DE SEARCH ##############
/*
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
}*/