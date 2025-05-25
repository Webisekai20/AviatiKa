function formatTime(isoTime) {
  try {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(isoTime).toLocaleTimeString('en-US', options);
  } catch (e) {
    console.error("Error formatting time:", e);
    return isoTime;
  }
}
function formatDate(isoTime) {
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoTime).toLocaleDateString('en-US', options);
  } catch (e) {
    console.error("Error formatting time:", e);
    return isoTime; 
  }


}


function HeaderServiceTab(evt, service) {
  var i, head_tabcontent, head_tablinks;
  head_tabcontent = document.getElementsByClassName("head_tabcontent");
  for (i = 0; i < head_tabcontent.length; i++) {
    head_tabcontent[i].style.display = "none";
  }
  head_tablinks = document.getElementsByClassName("head_tablinks");
  for (i = 0; i < head_tablinks.length; i++) {
    head_tablinks[i].className = head_tablinks[i].className.replace(" active", "");
  }
  document.getElementById(service).style.display = "block";
  if (evt) evt.currentTarget.className += " active";
}

window.addEventListener('DOMContentLoaded', function() {
  document.getElementById("defaultOpen_Headtab").click();;
  revealOnScroll();
});

fetch('/json files/flight_service.json')
.then(response => {
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
})
.then(data => {
  destinationData = data;
  populateAllTabs();
  document.getElementById("defaultOpen").click();
})
.catch(error => {
  console.error("Failed to load JSON:", error);
});
function populateAllTabs() {
  
  Object.keys(destinationData).forEach(region => {
    const tab = document.getElementById(region);
    const destinationGrid = tab.querySelector('.destination-grid'); // Target the destination-grid inside the tab
    if (!destinationGrid) return;

    destinationGrid.innerHTML = ''; // Clear existing grid content

    
    // Iterate over the destinations and create cards
    destinationData[region].forEach(flight => {
      const card = document.createElement('div');
      card.className = 'destination-card';
      if(region === 'Luzon'){
        card.innerHTML = `
            <!-- <img src="${flight.image}" alt="${flight.name}" class="destination-image"> -->
            <div class="destination-info">
              <h3>Flight Number: <strong>${flight.flightNumber}</strong></h3>
              <p>Departure City: <strong>${flight.departureCity}</strong></p>
              <p>Arrival City: <strong>${flight.arrivalCity}</strong></p>
              <p>Airport: <strong>${flight.airport}</strong></p>
              <p>Departure Time: <strong>${formatDate(flight.departureTime)}, ${ formatTime(flight.departureTime)}</strong></p>
              <p>Arrival Time: <strong>${formatDate(flight.arrivalTime)}, ${ formatTime(flight.arrivalTime)}</strong></p>
              <p>Duration: <strong>${flight.duration}</strong></p>
            </div>
            <div id="buttons" class="make_horizontal"><button id="edit">Edit</button> <button id="cancel">Cancel</button></div>
      `;
      } else  if(region === 'Cebu'){
         card.innerHTML = `
            <div class="destination-info">
              <h3>Hotel name : <strong>${flight.hotel_name}</strong></h3>
              <p>Location: <strong>${flight.location}</strong></p>
              <p>Rating: <strong>${flight.rating}</strong></p>
              <p>Room_type: <strong>${flight.room_type}</strong></p>
              <p>Amenities: <strong>${flight.amenities}</strong></p>
            </div>
            <div id="buttons" class="make_horizontal"><button id="edit">Edit</button> <button id="cancel">Cancel</button></div>
      `;
      } else  if(region === 'trans'){
         card.innerHTML = `
            <!-- <img src="${flight.image}" alt="${flight.name}" class="destination-image"> -->
            <div class="destination-info">
              <h3>Type : <strong>${flight.type}</strong></h3>
              <p>Company: <strong>${flight.company}</strong></p>
              <p>Car_model: <strong>${flight.car_model}</strong></p>
              <p>Pickup_date: <strong>${formatDate(flight.pickup_date)}, ${ formatTime(flight.pickup_date)}</strong></p>
              <p>Dropoff_date: <strong>${formatDate(flight.dropoff_date)}, ${ formatTime(flight.dropoff_date)}</strong></p>
              <p>Price: <strong>${flight.price}</strong></p>
            </div>
            <div id="buttons" class="make_horizontal"><button id="edit">Edit</button> <button id="cancel">Cancel</button></div>
      `;
      } else  if(region === 'attract'){
         card.innerHTML = `
            <!-- <img src="${flight.image}" alt="${flight.name}" class="destination-image"> -->
            <div class="destination-info">
              <h3>Event_name : <strong>${flight.event_name}</strong></h3>
              <p>Location: <strong>${flight.location}</strong></p>
              <p>Category: <strong>${flight.category}</strong></p>
              <p>Price: <strong>${flight.price}</strong></p>
              <p>Performers: <strong>${flight.performers}</strong></p>
            </div>
            <div id="buttons" class="make_horizontal"><button id="edit">Edit</button> <button id="cancel">Cancel</button></div>
      `;
      } else  if(region === 'acts'){
         card.innerHTML = `
            <!-- <img src="${flight.image}" alt="${flight.name}" class="destination-image"> -->
            <div class="destination-info">
              <h3>Activity_name : <strong>${flight.activity_name}</strong></h3>
              <p>Location: <strong>${flight.location}</strong></p>
              <p>Type: <strong>${flight.type}</strong></p>
              <p>Rating: <strong>${flight.rating}</strong></p>
              <p>Price: <strong>${flight.price}</strong></p>
            </div>
            <div id="buttons" class="make_horizontal"><button id="edit">Edit</button> <button id="cancel">Cancel</button></div>
      `;
      }
      destinationGrid.appendChild(card); // Append to the grid inside the tab
    });
  });

  revealOnScroll(); // Ensure scroll effects apply to newly created cards
}
