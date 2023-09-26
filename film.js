let nameH1;
let producer;
let title;
let episode;
let director;
let releaseDate;
let openingCrawl;
let planetsDiv;
let charactersDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    producer = document.querySelector('span#producer');
    title = document.querySelector('span#title');
    episode = document.querySelector('span#episode');
    director = document.querySelector('span#director');
    releaseDate = document.querySelector('span#releaseDate');
    openingCrawl = document.querySelector('span#openingCrawl');
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });
  
  async function getFilm(id) {
    let film;
    try {
      film = await fetchCharacter(id)
      film.planets = await fetchPlanets(film)
      film.characters = await fetchCharacters(film)
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderCharacter(character);
  
  }
  async function fetchCharacter(id) {
    let characterUrl = `${baseUrl}/characters/${id}`;
    return await fetch(characterUrl)
      .then(res => res.json())
  }
  
  async function fetchPlanets(character) {
    const url = `${baseUrl}/planets/${character?.homeworld}`;
    const planet = await fetch(url)
      .then(res => res.json())
    return planet;
  }
  
  async function fetchCharacters(character) {
    const url = `${baseUrl}/characters/${character?.id}/films`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
  }
  
  const renderCharacter = character => {
    document.title = `SWAPI - ${character?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = character?.name;
    heightSpan.textContent = character?.height;
    massSpan.textContent = character?.mass;
    birthYearSpan.textContent = character?.birth_year;
    homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
    const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
  }
  