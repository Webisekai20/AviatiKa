let destinationData = {}; // Global to cache data

// Fetch the JSON once
fetch('destinations.json')
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


fetch('travel_packs.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load travelpacks.json');
    }
    return response.json();
  })
  .then(data => {
    const container = document.querySelector('.travel-pack-container');
    container.innerHTML = ''; // Clear any existing content

    data.travelPacks.forEach(pack => {
      const packDiv = document.createElement('div');
      packDiv.className = 'travel-pack';
      packDiv.innerHTML = `
        <img src="${pack.image}" alt="${pack.alt}">
        <div class="pack-info">
          <div>
            <h3>${pack.title}</h3>
            <p>${pack.description}</p>
          </div>
          <div>
            <div class="pack-details">
              <span>${pack.duration}</span>
              <span>From ${pack.price}</span>
            </div>
            <button class="view-itinerary">View Itinerary</button>
          </div>
        </div>
      `;
      container.appendChild(packDiv);
    });
  })
  .catch(error => {
    console.error('Error loading travel packs:', error);
  });


  fetch('ratings.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load ratings.json');
    }
    return response.json();
  })
  .then(data => {
    const container = document.querySelector('.reviews-container');
    container.innerHTML = ''; // Clear any existing reviews

    data.rating.forEach(review => {
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'review';

      const stars = '★★★★★☆☆☆☆☆'.slice(5 - review.stars, 10 - review.stars); // e.g., ★★★★☆

      reviewDiv.innerHTML = `
        <div class="review-rating">${stars}</div>
        <p>"${review.comment}"</p>
        <div class="reviewer">- ${review.name}</div>
      `;
      container.appendChild(reviewDiv);
    });
  })
  .catch(error => {
    console.error('Error loading reviews:', error);
  });


  fetch('posts.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load posts.json');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    const postTitle = document.querySelector('.post h1');
    const postDescription = document.getElementById('post_description');

    // Access first landing_page object
    const landingData = data.landing_page;

    // Set title
    postTitle.textContent = landingData.title;

    // Build description HTML
    postDescription.innerHTML = landingData.descriptions.map(desc => `${desc}<br>`).join('');
  })
  .catch(error => {
    console.error('Error loading post:', error);
  });


function populateAllTabs() {
  Object.keys(destinationData).forEach(region => {
    const tab = document.getElementById(region);
    const destinationGrid = tab.querySelector('.destination-grid'); // Target the destination-grid inside the tab
    if (!destinationGrid) return;

    destinationGrid.innerHTML = ''; // Clear existing grid content

    // Iterate over the destinations and create cards
    destinationData[region].forEach(place => {
      const card = document.createElement('div');
      card.className = 'destination-card';
      card.innerHTML = `
          <img src="${place.image}" alt="${place.name}" class="destination-image">
          <div class="destination-info">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
          </div>
      `;
      destinationGrid.appendChild(card); // Append to the grid inside the tab
    });
  });

  revealOnScroll(); // Ensure scroll effects apply to newly created cards
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.destination-card, .travel-pack');

  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementBot = el.getBoundingClientRect().bottom;
    const revealPoint = 200; // You can tweak this value

    if (elementTop < windowHeight - revealPoint && elementBot > revealPoint) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
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

function serviceTab(evt, service) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(service).style.display = "block";
  if (evt) evt.currentTarget.className += " active";
}


function openDestination(evt, regionName) {
  // Get all elements with class="dest-tabcontent" and hide them
  const tabcontents = document.getElementsByClassName("dest-tabcontent");
  for (let i = 0; i < tabcontents.length; i++) {
    // Fade out by setting opacity to 0, then set display to none after the fade-out
    tabcontents[i].classList.remove("active");
    tabcontents[i].style.display = "none"; // Hide the tab
  }

  // Get all elements with class="dest-tablinks" and remove the class "active"
  const tablinks = document.getElementsByClassName("dest-tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the current tab and add an "active" class to the button that opened the tab
  const currentTab = document.getElementById(regionName);
  currentTab.style.display = "block"; // Show the tab
  setTimeout(() => {
    currentTab.classList.add("active"); // Fade in after display
  }, 10); // Delay to trigger transition

  evt.currentTarget.classList.add("active");
  revealOnScroll();
}

// Listen to scroll and load
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

window.addEventListener('DOMContentLoaded', function() {
  document.getElementById("defaultOpen").click();
  document.getElementById("defaultOpen_Headtab").click();
  document.querySelector(".dest-tablinks.active").click();
  revealOnScroll();
});








