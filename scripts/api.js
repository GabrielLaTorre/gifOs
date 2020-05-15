const apiObj = {

  apiKey: "lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw",
  abortCtrl: null,

  getTrendingGifs: ()=> {
    const found = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiObj.apiKey}&limit=10&rating=G`)
      .then(res => res.json())
      .then(obj => obj.data)
      .then(data => {
        return data;
      })
      .catch(e => console.log(e));
      return found;
    },

  getRandomGifs: (input)=> {
    const found =
      fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiObj.apiKey}&tag=${input}&rating=G`)
      .then(response => response.json())
      .then(content => content)
      .catch(err => console.log(err))
      return found;
  },


  getSearchGifs: (input, limit)=> {
    const found = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiObj.apiKey}&q=${input}&limit=${limit}&offset=0&rating=G&lang=en`)
    .then(response => response.json())
    .then(content => content.data)
    .then(data => data)
    .catch(err => console.log(err))
    return found;
  },

  autocompleteSearch: (input)=> {
    const found = fetch(`https://api.giphy.com/v1/gifs/search/tags?q=${input}&api_key=lO1NJjmLEEOMMlbZyPyx6EA0N4vEowCw&limit=3`)
    .then(data => data.json())
    .then(content => content)
    .catch(e => console.log(e))
    return found;
  },

  getSearchSuggestions: (term)=> {
    const found = fetch(`https://api.giphy.com/v1/tags/related/${term}?&api_key=${apiObj.apiKey}`)
    .then(obj => obj.json())
    .then(content => content.data)
    .catch(err => console.log(err))
    return found;
  },

  uploadGuifo: (form)=> {
    apiObj.abortCtrl = new AbortController()
    const heading = new Headers();
    const found = fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiObj.apiKey}`,{
      method: 'POST',
      headers: heading,
      body: form,
      mode: 'cors',
      signal: apiObj.abortCtrl.signal
    })
    .then(response => response.json())
    .catch(err => alert(err));
    return found;
  },

  getGifByID: (id) => {
    const found = fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiObj.apiKey}`)
    .then(data => data.json())
    .catch(err => console.log(err))
    return found;
  }

}