const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  const getEndpoint = []

  fetch(endpoint)
  .then(blob => blob.json())
  .then(datas => {
    const filterDatas = datas.slice(0, 100)
    getEndpoint.push(...filterDatas)
  })
  .catch(err => {
    console.log(err)
  })

  function findMatch(wordToMatch, getEndpoint) {
    return getEndpoint.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi')
      return place.city.match(regex) || place.state.match(regex)
    })
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function displayMatches(){
    const matchArray = findMatch(this.value, getEndpoint)
    const pushHtml = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi')
      const cities = place.city.replace(regex, `<span class="h1">${this.value}</span>`)
      const states = place.state.replace(regex, `<span class="h1">${this.value}</span>`)
      const populations = place.population.replace(regex, `<span class="h1">${this.value}</span>`)
      return `
      <li>
        <span class="name">${cities}, ${states}</span>
        <span class="population">${numberWithCommas(populations)}</span>
      </li>
      `
    }).join(' ')
    suggestions.innerHTML = pushHtml
  }

  const searchInput = document.querySelector('.search')
  const suggestions = document.querySelector('.suggestions')
  searchInput.addEventListener('change', displayMatches)
  searchInput.addEventListener('keyup', displayMatches)