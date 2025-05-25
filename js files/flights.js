
// Passenger & Class 
document.addEventListener('DOMContentLoaded', function() {
     // Elements
    const passengerSelector = document.getElementById('passenger-selector');
    const passengerDropdown = document.getElementById('passenger-dropdown');
    const passengerSummary = document.getElementById('passenger-summary');
    const applyButton = document.getElementById('apply-passengers');
    
    // Counter buttons
    const adultDecrease = document.getElementById('adult-decrease');
    const adultIncrease = document.getElementById('adult-increase');
    const adultCount = document.getElementById('adult-count');
    
    const childDecrease = document.getElementById('child-decrease');
    const childIncrease = document.getElementById('child-increase');
    const childCount = document.getElementById('child-count');
    
    const infantDecrease = document.getElementById('infant-decrease');
    const infantIncrease = document.getElementById('infant-increase');
    const infantCount = document.getElementById('infant-count');
    
    // Radio options
    const radioOptions = document.querySelectorAll('.radio-option');
    
    // State
    let state = {
       adults: 1,
        children: 0,
        infants: 0,
        cabinClass: 'economy'
    };
    
    //Toggle dropdown visibility
    passengerSelector.addEventListener('click', function(e) {
        e.stopPropagation();
        passengerDropdown.classList.toggle('visible');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!passengerDropdown.contains(e.target) && e.target !== passengerSelector) {
            passengerDropdown.classList.remove('visible');
        }
    });
    
    // Apply button closes dropdown and saves selection
    applyButton.addEventListener('click', function() {
        passengerDropdown.classList.remove('visible');
        updateSummary();
    });
    
    // Adult counter
    adultDecrease.addEventListener('click', function() {
        if (state.adults > 1) {
            state.adults--;
            updateCounters();
        }
    });
    
    adultIncrease.addEventListener('click', function() {
        if (state.adults < 9) {
            state.adults++;
            updateCounters();
        }
    });
    
    // Child counter
    childDecrease.addEventListener('click', function() {
        if (state.children > 0) {
            state.children--;
            updateCounters();
        }
    });
    
    childIncrease.addEventListener('click', function() {
        if (state.children < 9) {
            state.children++;
            updateCounters();
        }
    });
    
    // Infant counter
    infantDecrease.addEventListener('click', function() {
        if (state.infants > 0) {
            state.infants--;
            updateCounters();
        }
    });
    
    infantIncrease.addEventListener('click', function() {
        if (state.infants < Math.min(state.adults, 9)) {
            state.infants++;
            updateCounters();
        }
    });
    
    // Cabin class selection
    radioOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            radioOptions.forEach(opt => {
                opt.querySelector('.radio-circle').classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.querySelector('.radio-circle').classList.add('selected');
            
            // Update state
            state.cabinClass = this.dataset.value;
        });
    });
    
    // Update counter display and button states
    function updateCounters() {
        // Update count displays
        adultCount.textContent = state.adults;
        childCount.textContent = state.children;
        infantCount.textContent = state.infants;
        
        // Update button states based on limits
        adultDecrease.disabled = state.adults <= 1;
        adultIncrease.disabled = state.adults >= 9;
        
        childDecrease.disabled = state.children <= 0;
        childIncrease.disabled = state.children >= 9;
        
        infantDecrease.disabled = state.infants <= 0;
        infantIncrease.disabled = state.infants >= Math.min(state.adults, 9);
    }
    
    // Update summary text
    function updateSummary() {
        let summary = '';
        
        // Add passenger counts
        let passengerText = [];
        if (state.adults === 1) {
            passengerText.push('1 Adult');
        } else if (state.adults > 1) {
            passengerText.push(`${state.adults} Adults`);
        }
        
        if (state.children === 1) {
            passengerText.push('1 Child');
        } else if (state.children > 1) {
            passengerText.push(`${state.children} Children`);
        }
        
        if (state.infants === 1) {
            passengerText.push('1 Infant');
        } else if (state.infants > 1) {
            passengerText.push(`${state.infants} Infants`);
        }
        
        summary = passengerText.join(', ');
        
        // Add cabin class
        let cabinClassText = '';
        switch (state.cabinClass) {
            case 'economy':
                cabinClassText = 'Economy';
                break;
            case 'premium':
                cabinClassText = 'Premium economy';
                break;
            case 'business':
                cabinClassText = 'Business class';
                break;
            case 'first':
                cabinClassText = 'First class';
                break;
        }
        
        summary += `, ${cabinClassText}`;
        passengerSummary.textContent = summary;
    }
    
    // Initialize
    updateCounters();
});


// search container functionality
function selectOption(optionId) {
  // Remove active class from all radio buttons
  document.querySelectorAll('.radio-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to the selected radio button
  const selectedRadio = document.getElementById(optionId);
  if (selectedRadio) {
    selectedRadio.classList.add('active');
  }
  
  // Get the main search fields (the first four divs in search-container)
  const searchContainer = document.querySelector('.search-container');
  const mainSearchFields = [
    searchContainer.querySelector('.input-group:nth-child(1)'),
    searchContainer.querySelector('.direction-icon'),
    searchContainer.querySelector('.input-group:nth-child(3)'),
    searchContainer.querySelector('.input-group:nth-child(4)')
  ];
  
  // Get the multi-city segments container
  const multiCitySegments = document.querySelector('.multi-city-segments');
  
  // Toggle visibility based on selection
  if (optionId === 'multi-city') {
    // Hide main search fields when multi-city is selected
    mainSearchFields.forEach(element => {
      if (element) {
        element.style.display = 'none';
      }
    });
    
    // Show multi-city segments
    if (multiCitySegments) {
      multiCitySegments.classList.add('active');
    }
  } else {
    // Show main search fields for round-trip and one-way
    mainSearchFields.forEach(element => {
      if (element) {
        element.style.display = '';  // Reset to default display
      }
    });
    
    // Hide multi-city segments
    if (multiCitySegments) {
      multiCitySegments.classList.remove('active');
    }
  }
  
  // one-way vs round-trip DATES
  const datePicker = document.querySelector('.date-picker-container');
  if (datePicker && optionId === 'one-way') {
    datePicker.style.display = 'none';
  } else if (datePicker && optionId === 'round-trip') {
    datePicker.style.display = '';
  }
}

// Makes trip type work(uses selection option())
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.trip-option').forEach(option => {
    const optionId = option.querySelector('.radio-btn').id;
    option.addEventListener('click', function() {
      selectOption(optionId);
    });
  });
  
  // Check if a trip type is already selected (has active class)
  const activeOption = document.querySelector('.radio-btn.active');
  if (activeOption) {
    // Apply initial visibility rules based on the active selection
    selectOption(activeOption.id);
  } else {
    // Default to round-trip if nothing is selected
    selectOption('round-trip');
  }
});

//  FOr Date selection
function setupAllDatePickers() {
  const datePickerContainers = document.querySelectorAll('.date-picker-container:not(.initialized)');

  datePickerContainers.forEach(container => {
    // Mark as initialized to avoid duplicate setup
    container.classList.add('initialized');
    
    const datePickerInput = container.querySelector('.date-picker-input');
    const calendar = container.querySelector('.calendar-container');
    const calendarDays = container.querySelector('.calendar-days');
    const currentMonthDisplay = container.querySelector('.current-month');
    const prevMonthBtn = container.querySelector('.prev-month');
    const nextMonthBtn = container.querySelector('.next-month');

    let currentDate = new Date();
    let selectedDate = null;

    datePickerInput.addEventListener('click', function () {
      calendar.style.display = calendar.style.display === 'block' ? 'none' : 'block';
      renderCalendar();
    });

    document.addEventListener('click', function (event) {
      if (!calendar.contains(event.target) && event.target !== datePickerInput) {
        calendar.style.display = 'none';
      }
    });

    prevMonthBtn.addEventListener('click', function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

    nextMonthBtn.addEventListener('click', function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

    function renderCalendar() {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

      currentMonthDisplay.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      calendarDays.innerHTML = '';

      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const daysInMonth = lastDay.getDate();

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarDays.appendChild(emptyDay);
      }

      // Create day elements for each day in the month
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = i;

        const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

        // Highlight the selected date
        if (selectedDate && thisDate.toDateString() === selectedDate.toDateString()) {
          dayElement.classList.add('selected');
        }

        dayElement.addEventListener('click', function () {
          // Set the selected date
          selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
          updateDateDisplay();
          calendar.style.display = 'none';
          
          renderCalendar();
        });

        calendarDays.appendChild(dayElement);
      }
    }

    function updateDateDisplay() {
      function formatDate(date) {
        if (!date) return 'Select date';
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
      }

      datePickerInput.textContent = formatDate(selectedDate);
    }

    // Initial setup
    if (!selectedDate) {
      datePickerInput.textContent = 'Select date';
    }
    
    renderCalendar();
  });
}

// multi city type
document.addEventListener('DOMContentLoaded', function() {
    // Trip type selection
    const tripOptions = document.querySelectorAll('.trip-option');
    const roundTrip = document.getElementById('round-trip');
    const oneWay = document.getElementById('one-way');
    const multiCity = document.getElementById('multi-city');
    const multiCitySegments = document.querySelector('.multi-city-segments');
    
    // When the user clicks on a trip option
    tripOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Reset all trip options
        document.querySelectorAll('.radio-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Get the radio button within this option
        const radioBtn = this.querySelector('.radio-btn');
        
        // Activate the selected radio button
        radioBtn.classList.add('active');
        
        // Show/hide multi-city segments based on selection
        if (radioBtn.id === 'multi-city') {
          multiCitySegments.classList.add('active');
        } else {
          multiCitySegments.classList.remove('active');
        }
      });
    });
    
    // Add another flight button functionality
    const addFlightBtn = document.querySelector('.add-flight-btn');
    
    // Function to handle flight segment removal
    function handleRemoveSegment() {
      const segment = this.closest('.flight-segment');
      if (segment) {
        segment.remove();
        updateSegmentNumbers();
        segmentCount--;
      }
    }
    
    // Function to update segment numbers after removal
    function updateSegmentNumbers() {
      const segments = document.querySelectorAll('.flight-segment');
      segments.forEach((segment, index) => {
        const segmentNumber = segment.querySelector('.segment-number');
        if (segmentNumber) {
          segmentNumber.textContent = index + 1;
        }
      });
    }
    
    // Apply remove event handlers to existing segments (if any)
    function initRemoveButtons() {
      const removeButtons = document.querySelectorAll('.remove-segment-btn');
      removeButtons.forEach(btn => {
        btn.addEventListener('click', handleRemoveSegment);
      });
    }
    
    // Initial setup for any existing remove buttons
    initRemoveButtons();
    
    addFlightBtn.addEventListener('click', function() {
      
      // Create a new segment
      const newSegment = document.createElement('div');
      newSegment.className = 'flight-segment';
      
      // Set the HTML content for the new segment
      newSegment.innerHTML = `
        <div class="input-group">
          <div class="location-input">
            <input type="text" placeholder="Leaving from" class="origin-input">
          </div>
        </div>
        
        <div class="direction-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="input-group">
          <div class="location-input">
            <input type="text" placeholder="Going to" class="destination-input">
          </div>
        </div>
        
        <div class="input-group">
          <div class="date-picker-container">
            <button class="date-picker-input">
              Tue, May 13
            </button>
            
            <div class="calendar-container">
              <div class="calendar-header">
                <button class="prev-month">&lt;</button>
                <div class="current-month">May 2025</div>
                <button class="next-month">&gt;</button>
              </div>
              
              <div class="weekdays">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>
              
              <div class="calendar-days">
              </div>
              
              <div class="calendar-footer" id="calendar-footer">
                Select start date
              </div>
            </div>
          </div>
        </div>
        
        <div class="remove-segment-container">
          <button class="remove-segment-btn" title="Remove this flight segment">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      `;
      
      // Insert the new segment before the "Add another flight" button
      addFlightBtn.parentNode.insertBefore(newSegment, addFlightBtn);
      
      // Initialize the date picker for the new segment
      setupAllDatePickers();
      
      // Add event listener to the new remove button
      const newRemoveBtn = newSegment.querySelector('.remove-segment-btn');
      if (newRemoveBtn) {
        newRemoveBtn.addEventListener('click', handleRemoveSegment);
      }
    });
    
    // Setup date picker functionality
    setupAllDatePickers();
});

// Book a flight Search results
document.addEventListener('DOMContentLoaded', function() {  
// Add another flight button functionality
const resultsContainer = document.getElementById('results');
const searchBtn = document.querySelector('.search-button');

// fetch & show results data
searchBtn.addEventListener('click', function () {
  fetch('/json files/results.json')
    .then(response => response.json())
    .then(data => {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <h2>Available Flights</h2>
          <div class="results-list">
            ${data.results.map(flight => `
              <div class="flight-card">
                <div class="flight-header">
                  <strong>${flight.airline}</strong> <span>(${flight.flightNumber})</span>
                </div>
                <div class="flight-info">
                  <p><strong>From:</strong> ${flight.departure}</p>
                  <p><strong>To:</strong> ${flight.arrival}</p>
                  <p><strong>Departure:</strong> ${new Date(flight.departureTime).toLocaleString()}</p>
                  <p><strong>Arrival:</strong> ${new Date(flight.arrivalTime).toLocaleString()}</p>
                  <p><strong>Duration:</strong> ${flight.duration}</p>
                  <p><strong>Price:</strong> ${flight.price}</p>
                </div>
                <button class="book-now">Book Now</button>
              </div>
            `).join('')}
          </div>
          <button class="close-modal">Close</button>
        </div>
      `;
      resultsContainer.appendChild(modal);
      modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    });
});
});

// the other threee search functionality 
document.addEventListener("DOMContentLoaded", function () {
  // State management for booking information
  const bookingState = {
    bookingNumber: "",
    pin: "",
    currentFlight: null,
    isAuthenticated: false
  };

  // Tab functionality
  function flightsTab(evt, tabName) {
    // Hide all tab content
    const tabcontents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontents.length; i++) {
      tabcontents[i].style.display = "none";
    }

    // Remove active class from all tab buttons
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add active class to the button
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // If we're already authenticated and switching to a tab that needs booking info
    if (bookingState.isAuthenticated && ["Manage", "Check-in", "Flight"].includes(tabName)) {
      // Update the input fields in the current tab
      updateTabInputs(tabName);
      
      // Update the flight information display
      if (bookingState.currentFlight) {
        updateFlightInfo(tabName, bookingState.currentFlight);
      }
    }
  }

  // Open default tab
  const defaultTab = document.getElementById("defaultOpen");
  if (defaultTab) {
    defaultTab.click();
  }

  // Format ISO time to readable format (e.g. 6:00 PM)
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

  // Function to update input fields in a tab with the current booking state
  function updateTabInputs(tabID) {
    const tabElement = document.getElementById(tabID);
    if (!tabElement) return;
    
    const bookingInput = tabElement.querySelector('.BookingNum-input input');
    const pinInput = tabElement.querySelector('.pin-input input');
    
    if (bookingInput && bookingState.bookingNumber) {
      bookingInput.value = bookingState.bookingNumber;
    }
    
    if (pinInput && bookingState.pin) {
      pinInput.value = bookingState.pin;
    }
  }

  // Load flight data
  fetch('/json files/flights.json')
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(flightData => {
      // Store flight data for later use
      const flights = Array.isArray(flightData) ? flightData : [flightData];

      // Find all search buttons in tabs that require booking lookup
      const tabIDs = ["Manage", "Check-in", "Flight"];
      
      tabIDs.forEach(tabID => {
        const tabElement = document.getElementById(tabID);
        if (!tabElement) return;
        
        const searchBtn = tabElement.querySelector('.search-button');
        const bookingInput = tabElement.querySelector('.BookingNum-input input');
        const pinInput = tabElement.querySelector('.pin-input input');
        
        if (!searchBtn || !bookingInput || !pinInput) {
          console.error(`Missing required elements in ${tabID} tab`);
          return;
        }
        
        // Add click event listener to the search button
        searchBtn.addEventListener('click', () => {
          const bookingNumber = bookingInput.value.trim();
          const pin = pinInput.value.trim();
          
          if (!bookingNumber || !pin) {
            alert("Please enter both Booking Number and PIN.");
            return;
          }
          
          // Search for matching flight
          const matchedFlight = flights.find(flight => 
            flight.bookingNumber === bookingNumber && flight.pin === pin
          );
          
          if (matchedFlight) {
            // Update global booking state
            bookingState.bookingNumber = bookingNumber;
            bookingState.pin = pin;
            bookingState.currentFlight = matchedFlight;
            bookingState.isAuthenticated = true;
            
            // Update all tabs with the booking information
            tabIDs.forEach(id => {
              updateTabInputs(id);
            });
            
            // Update current tab flight information
            updateFlightInfo(tabID, matchedFlight);
          } else {
            alert("Booking not found. Please check your Booking Number and PIN.");
          }
        });
      });
      
      // Function to update flight information based on tab
      function updateFlightInfo(tabID, flight) {
        if (tabID === "Manage") {
          const ManageInNote = document.getElementById("manage_rigth_note");
          if (ManageInNote) {
            ManageInNote.innerHTML = `
              <p>From: <strong>${flight.departureCity}</strong></p>
              <p>To: <strong>${flight.arrivalCity}</strong></p>
              <p>Departure: <strong>${formatDate(flight.departureTime), formatTime(flight.departureTime)}</strong></p>
              <p>Arrival: <strong>${formatDate(flight.arrivalTime), formatTime(flight.arrivalTime)}</strong></p>
              <p>Duration: <strong>${flight.duration}</strong></p>
              <p>Class: <strong>${flight.class}</strong></p>
            `;
          }
        } else if (tabID === "Check-in") {
          const checkInNote = document.getElementById("checkIn_right_note");
          if (checkInNote) {
            checkInNote.innerHTML = `
              <p><br>Departure: <strong>${formatTime(flight.departureTime)}</strong></p>
              <p>Arrival: <strong>${formatTime(flight.arrivalTime)}</strong></p>
              <p>Check-in Open: <strong>${formatTime(flight.checkInOpen)}</strong></p>
              <p>Check-in Close: <strong>${formatTime(flight.checkInClose)}</strong></p>
              <p>Check-in Baggage: <strong>${flight.baggageAllowance}</strong></p>
              <p>Class: <strong>${flight.class}</strong></p>
            `;
          }
        } else if (tabID === "Flight") {
          const flightNote = document.getElementById("flight_right_note");
          if (flightNote) {
            // Add a class for status color
            const statusClass = flight.flightStatus.toLowerCase() === 'canceled' ? 'red' : '';
            
            flightNote.innerHTML = `
              <p><br>Airport: <strong>${flight.airport}</strong></p>
              <p>Flight Route: <strong>${flight.departureCity} - ${flight.arrivalCity}</strong></p>
              <p class="border_bottom">Flight Status: <strong class="${statusClass}">${flight.flightStatus}</strong></p>
              <p>Gate Info: <strong>${flight.gate}</strong></p>
              <p>Check-in Open: <strong>${formatTime(flight.checkInOpen)}</strong></p>
              <p>Check-in Close: <strong>${formatTime(flight.checkInClose)}</strong></p>
              <p>Seat: <strong>${flight.seat}</strong></p>
            `;
          }
        } else if (tabID === "Manage") {
          // You could add a specific area in the Manage tab to display flight info
          const rightNote = tabElement.querySelector('.right_note');
          if (rightNote) {
            rightNote.innerHTML = `
              <h4><strong>Booking Found</strong></h4>
              <p>Flight: ${flight.departureCity} to ${flight.arrivalCity}</p>
              <p>Departure: ${formatTime(flight.departureTime)}</p>
              <p>Status: ${flight.flightStatus}</p>
            `;
          } else {
            // If no display area exists, show minimal info
            alert(`Booking found: Flight from ${flight.departureCity} to ${flight.arrivalCity}`);
          }
        }
      }
    })
    .catch(error => {
      console.error("Failed to load flight data:", error);
    });
});
