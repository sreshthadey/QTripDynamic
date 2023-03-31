import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  // console.log('From init()');
  // console.log(config.backendEndpoint);
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const citiesResponse = await fetch(config.backendEndpoint + "/cities");
    const cities = await citiesResponse.json();
    return cities;
  }
  catch(err){
    console.log(err);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  console.log("hi"); 
  const parentElement = document.getElementById('data');
  const cityContainer = document.createElement('div');
  cityContainer.className = "col-sm-6 col-lg-3 mb-4";
  const anchorElement = document.createElement('a');
  console.log(id);
  anchorElement.href = `pages/adventures/?city=${id}`;
  anchorElement.id = id;
  cityContainer.appendChild(anchorElement);
  const tileDiv = document.createElement('div');
  tileDiv.className = 'tile';
  //tileDiv.id = city;
  anchorElement.appendChild(tileDiv);
  const imageElement = document.createElement('img');
  imageElement.src = image;
  tileDiv.appendChild(imageElement);
  const tileTextDiv = document.createElement('div');
  tileTextDiv.className = 'tile-text text-center';
  tileDiv.appendChild(tileTextDiv);
  const tileH5 = document.createElement('h5');
  tileH5.innerText = city;
  tileTextDiv.appendChild(tileH5);
  const tilePElement = document.createElement('p');
  tilePElement.innerText = description;
  tileTextDiv.appendChild(tilePElement);
  parentElement.appendChild(cityContainer);
  
}

export { init, fetchCities, addCityToDOM };
