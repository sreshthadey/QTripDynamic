import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  for (const [key, value] of urlParams) {  
    if (key === 'adventure') {
      return value;
    } 
  } 
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  console.log(adventureId);
  try {
    let adventureDetailsResponse = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    let adventureDetails = await adventureDetailsResponse.json();
    //console.log(adventureDetails);
    return adventureDetails;
  }
  catch (err) {
    //console.log(err);
    return null;
  }

  // Place holder for functionality to work in the Stubs
 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').innerHTML = adventure.name;
  document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;
  document.getElementById('adventure-content').innerHTML = adventure.content;
  adventure.images.forEach((image, imageIndex) => {
    const imageDiv = document.createElement('div');
    imageDiv.innerHTML = `<img src=${image} class = 'activity-card-image'>`
    document.getElementById('photo-gallery').append(imageDiv);
  })
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById('photo-gallery').innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id='carousel-inner-elem'>
  
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> 
  `;
  images.forEach((image, imageIndex) => {
    console.log(image);
    const carouselItem = document.createElement('div');
    const activeClass = imageIndex === 0 ? " active" : "";
    carouselItem.className = `carousel-item${activeClass}`;
    carouselItem.innerHTML += `<img src=${image} class = 'activity-card-image'>`;
    document.getElementById('carousel-inner-elem').appendChild(carouselItem);
  })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  if(adventure.available){
    let soldOutElement = document.getElementById('reservation-panel-sold-out');
    soldOutElement.style.display = 'none';
    document.getElementById("reservation-panel-available").style.display = 'block';
    let costPerHeadElem = document.getElementById('reservation-person-cost');
    costPerHeadElem.innerHTML = adventure.costPerHead;
  }
  else{
    let reservationAvailableElement = document.getElementById('reservation-panel-available');
    reservationAvailableElement.style.display = 'none';
    document.getElementById("reservation-panel-sold-out").style.display = 'block';
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const total = adventure.costPerHead * persons;
  document.getElementById('reservation-cost').innerHTML = total;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let formElements = form.elements;
    let url = config.backendEndpoint + '/reservations/new';
    let data = {
      'name': formElements["name"].value,
      'date': formElements["date"].value,
      'person': formElements["person"].value,
      'adventure': adventure.id
    };
    try{
      const response = await fetch(url, {
        method : "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
      });
      if(response.ok){
        alert("Success!");
        window.location.reload();
      }
      else{
        let data = response.json();
        alert(`Failed ${data.message}`);
      }
    }catch(err){
      console.log("Failed - Fetch call resulted in error");
    }
    
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservedBanner = document.getElementById("reserved-banner");
  if(adventure.reserved){
    reservedBanner.style.display = 'block';
  }
  else{
    reservedBanner.style.display = 'none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
