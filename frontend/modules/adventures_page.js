
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  for (const [key, value] of urlParams) { 
    if (key === 'city') {
      return value;
    } 
    //console.log(`${key}: ${value}`);
  }
  //console.log(typeof(search));
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const city1 = city.replace(/[^a-zA-Z0-9]/g, '');
    let adventuresResponse = await fetch(config.backendEndpoint + '/adventures?city=' + city1);
    let adventures = await adventuresResponse.json();
    return adventures;
  }
  catch (err) {
    console.log(err);
    return null;
  }


}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //console.log(adventures);
  
  adventures.forEach((adventure) => {
    const parentElement = document.getElementById('data');
    const adventureContainer = document.createElement('div');
    adventureContainer.className = "col-6 col-xl-3 mb-3";

    adventureContainer.innerHTML = `
    <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
              <div class="activity-card card adventure-card">
                <div class = "category-banner">${adventure.category}</div>
                <img
                  src=${adventure.image}
                  class="card-img-top activity-card-image"
                />
                <div class="card-body w-100 d-lg-flex justify-content-between"> 
                  <h5 class="card-title">${adventure.name}</h5>
                  <p class="card-text">₹${adventure.costPerHead}</p>
                </div>
                <div class="card-body w-100 d-lg-flex justify-content-between">
                  <h5 class="card-title">Duration</h5>
                  <p class="card-text">${adventure.duration}</p>
                </div>
              </div>
    </a>`;
    parentElement.appendChild(adventureContainer);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  console.log(low+"-"+high);
  let filteredList = [];
  list.forEach((object) =>{
    if(parseInt(object.duration) >= low && parseInt(object.duration) <= high){
      filteredList.push(object);
    }
  });
  //console.log(filteredList);
  return filteredList;
  //return list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  list.forEach((object) =>{
    if(categoryList.includes(object.category)){
      filteredList.push(object);
    }
  });
  return filteredList;
  //return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // console.log(filters);
  let filteredList = [];
  if(filters.duration === '' && filters.category.length != 0){
    filteredList = filterByCategory(list, filters.category);
  }
  else if(filters.duration != '' && filters.category.length === 0){
    let durationNumbers = filters.duration.split('-');
    //console.log(durationNumbers);
    filteredList = filterByDuration(list, durationNumbers[0], durationNumbers[1]);
  }
  else if(filters.duration != '' && filters.category.length != 0){
    let list1 = filterByCategory(list, filters.category);
    console.log(list1);
    let durationNumbers = filters.duration.split('-');
    let list2 = filterByDuration(list1, durationNumbers[0], durationNumbers[1]);
    console.log(list2);
    filteredList = list2;
  }
  else{
    return list;
  }
  //console.log(filteredList);
  // Place holder for functionality to work in the Stubs
  return filteredList;
  //return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let filtersString = window.localStorage.getItem("filters");
  let filters = JSON.parse(filtersString);
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  //console.log(filters);
  let parentElement = document.getElementById('category-list');
  filters.category.forEach((categoryItem) =>{
    let categoryDiv = document.createElement('div');
    categoryDiv.className = "category-filter";
    categoryDiv.textContent = categoryItem;
    parentElement.appendChild(categoryDiv);
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
