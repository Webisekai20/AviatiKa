// Hotel & Homes occupier  
document.addEventListener('DOMContentLoaded', function() {
    // Elements - First check if elements exist to prevent null reference errors
    const passengerSelector = document.getElementById('h_h_passenger-selector');
    const passengerDropdown = document.getElementById('h_h_passenger-dropdown');
    const passengerSummary = document.getElementById('h_h_passenger-summary');
    const applyButton = document.getElementById('h_h_apply-passengers');
    
    // Only initialize if required elements exist
    if (!passengerSelector || !passengerDropdown || !passengerSummary || !applyButton) {
        console.error('Missing required elements for passenger selector');
        return;
    }
    
    // Counter buttons
    const adultDecrease = document.getElementById('h_h_adult-decrease');
    const adultIncrease = document.getElementById('h_h_adult-increase');
    const adultCount = document.getElementById('h_h_adult-count');
    
    const childDecrease = document.getElementById('h_h_child-decrease');
    const childIncrease = document.getElementById('h_h_child-increase');
    const childCount = document.getElementById('h_h_child-count');
    
    // Check if counter elements exist
    if (!adultDecrease || !adultIncrease || !adultCount || 
        !childDecrease || !childIncrease || !childCount) {
        console.error('Missing required counter elements');
        return;
    }
    
    // State
    let state = {
        adults: 1,
        children: 0,
    };
    
    // Toggle dropdown visibility
    passengerSelector.addEventListener('click', function(e) {
        e.stopPropagation();
        passengerDropdown.classList.toggle('visible');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (passengerDropdown && !passengerDropdown.contains(e.target) && e.target !== passengerSelector) {
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
    
    // Update counter display and button states
    function updateCounters() {
        // Update count displays
        adultCount.textContent = state.adults;
        childCount.textContent = state.children;
        
        // Update button states based on limits
        adultDecrease.disabled = state.adults <= 1;
        adultIncrease.disabled = state.adults >= 9;
        
        childDecrease.disabled = state.children <= 0;
        childIncrease.disabled = state.children >= 9;
        
        // Also update summary whenever counters change
        updateSummary();
    }
    
    // Update summary text
    function updateSummary() {
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
        
        let summary = passengerText.join(', ');
        passengerSummary.textContent = summary;
    }
    
    // Initialize
    updateCounters();
    updateSummary();
});

// Book a cars Search results
document.addEventListener('DOMContentLoaded', function() {  
    // Add another cars button functionality
    const h_h_resultsContainer = document.getElementById('h_h_results');
    const h_h_searchBtn = document.getElementById('h_h_search-button');
    
    // Check if elements exist
    if (!h_h_resultsContainer || !h_h_searchBtn) {
        console.error('Missing required elements for hotel search');
        return;
    }

    // fetch & show results data
    h_h_searchBtn.addEventListener('click', function () {      
        fetch('/json%20files/hotel&homes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                    // Create modal
                const h_h_modal = document.createElement('div');
                h_h_modal.className = 'modal';
                
                // Check if data and results exist
                if (!data || !data.results || !Array.isArray(data.results)) {
                    h_h_modal.innerHTML = `
                        <div class="modal-content">
                            <h2>Error</h2>
                            <p>No hotel results found or invalid data format.</p>
                            <button class="close-modal">Close</button>
                        </div>
                    `;
                } else {
                    h_h_modal.innerHTML = `
                        <div class="modal-content">
                            <h2>Available Hotel&Homes</h2>
                            <div class="results-list">
                                ${data.results.map(cars => `
                                    <div class="cars-card">
                                        <div class="make_horizontal">
                                            <img class ="image_results" src="${cars.image_url}" alt="${cars.hotel_name}" onerror="this.src='placeholder.jpg'">
                                            <div class="cars-info">
                                                <div class="cars-header">
                                                    <strong>${cars.hotel_name}</strong> 
                                                </div>
                                                <p><strong>Rating:</strong> ${cars.rating || 'N/A'}</p>
                                                <p><strong>Location:</strong> ${cars.location || 'N/A'}</p>
                                                <p><strong>Room type:</strong> ${cars.room_type || 'N/A'}</p>
                                                <p><strong>Amenities:</strong> ${cars.amenities || 'N/A'}</p>
                                                <p><strong>Price:</strong> ${cars.price_per_night || 'N/A'}</p>
                                            </div>
                                        </div>              
                                        <button class="book-now">Book Now</button>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="close-modal">Close</button>
                        </div>
                    `;
                }
                
                h_h_resultsContainer.appendChild(h_h_modal);
                
                // Add event listeners to all "Book Now" buttons
                const bookButtons = h_h_modal.querySelectorAll('.book-now');
                bookButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        alert('Booking functionality will be implemented soon!');
                    });
                });
                
                // Close modal button
                const closeButton = h_h_modal.querySelector('.close-modal');
                if (closeButton) {
                    closeButton.addEventListener('click', () => h_h_modal.remove());
                }
            })
            .catch(error => {
                console.error('Error fetching hotel data:', error);
                
                // Remove loading indicator
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }
                
                // Show error message
                const errorModal = document.createElement('div');
                errorModal.className = 'modal';
                errorModal.innerHTML = `
                    <div class="modal-content">
                        <h2>Error</h2>
                        <p>Failed to load hotel data. Please try again later.</p>
                        <p>Error: ${error.message}</p>
                        <button class="close-modal">Close</button>
                    </div>
                `;
                h_h_resultsContainer.appendChild(errorModal);
                
                // Close error modal button
                const closeButton = errorModal.querySelector('.close-modal');
                if (closeButton) {
                    closeButton.addEventListener('click', () => errorModal.remove());
                }
            });
    });
});

// Car Passenger 
document.addEventListener('DOMContentLoaded', function() {
    // Elements - First check if elements exist to prevent null reference errors
    const passengerSelector = document.getElementById('car_passenger-selector');
    const passengerDropdown = document.getElementById('car_passenger-dropdown');
    const passengerSummary = document.getElementById('car_passenger-summary');
    const applyButton = document.getElementById('car_apply-passengers');
    
    // Only initialize if required elements exist
    if (!passengerSelector || !passengerDropdown || !passengerSummary || !applyButton) {
        console.error('Missing required elements for passenger selector');
        return;
    }
    
    // Counter buttons
    const adultDecrease = document.getElementById('car_adult-decrease');
    const adultIncrease = document.getElementById('car_adult-increase');
    const adultCount = document.getElementById('car_adult-count');
    
    const childDecrease = document.getElementById('car_child-decrease');
    const childIncrease = document.getElementById('car_child-increase');
    const childCount = document.getElementById('car_child-count');
    
    // Check if counter elements exist
    if (!adultDecrease || !adultIncrease || !adultCount || 
        !childDecrease || !childIncrease || !childCount) {
        console.error('Missing required counter elements');
        return;
    }
    
    // State
    let state = {
        adults: 1,
        children: 0,
    };
    
    // Toggle dropdown visibility
    passengerSelector.addEventListener('click', function(e) {
        e.stopPropagation();
        passengerDropdown.classList.toggle('visible');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (passengerDropdown && !passengerDropdown.contains(e.target) && e.target !== passengerSelector) {
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
    
    // Update counter display and button states
    function updateCounters() {
        // Update count displays
        adultCount.textContent = state.adults;
        childCount.textContent = state.children;
        
        // Update button states based on limits
        adultDecrease.disabled = state.adults <= 1;
        adultIncrease.disabled = state.adults >= 9;
        
        childDecrease.disabled = state.children <= 0;
        childIncrease.disabled = state.children >= 9;
        
        // Also update summary whenever counters change
        updateSummary();
    }
    
    // Update summary text
    function updateSummary() {
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
        
        let summary = passengerText.join(', ');
        passengerSummary.textContent = summary;
    }
    
    // Initialize
    updateCounters();
    updateSummary();
});

// Book a Car Search results
document.addEventListener('DOMContentLoaded', function() {  
    // Add another cars button functionality
    const h_h_resultsContainer = document.getElementById('car_results');
    const h_h_searchBtn = document.getElementById('car_search-button');
    
    // Check if elements exist
    if (!h_h_resultsContainer || !h_h_searchBtn) {
        console.error('Missing required elements for hotel search');
        return;
    }

    // fetch & show results data
    h_h_searchBtn.addEventListener('click', function () {        
        fetch('/json%20files/cars.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {                
                // Create modal
                const h_h_modal = document.createElement('div');
                h_h_modal.className = 'modal';
                
                // Check if data and results exist
                if (!data || !data.results || !Array.isArray(data.results)) {
                    h_h_modal.innerHTML = `
                        <div class="modal-content">
                            <h2>Error</h2>
                            <p>No hotel results found or invalid data format.</p>
                            <button class="close-modal">Close</button>
                        </div>
                    `;
                } else {
                    h_h_modal.innerHTML = `
                        <div class="modal-content">
                            <h2>Available Cars</h2>
                            <div class="results-list">
                                ${data.results.map(cars => `
                                    <div class="cars-card">
                                        <div class="make_horizontal">
                                            <img class ="image_results" src="${cars.image_url}" alt="${cars.car_model}" onerror="this.src='placeholder.jpg'">
                                            <div class="cars-info">
                                                <div class="cars-header">
                                                    <strong>${cars.car_model}</strong> 
                                                </div>
                                                <p><strong>Car type:</strong> ${cars.car_type || 'N/A'}</p>
                                                <p><strong>Seats:</strong> ${cars.seats || 'N/A'}</p>
                                                <p><strong>Transmission:</strong> ${cars.transmission || 'N/A'}</p>
                                                <p><strong>Price per day:</strong> ${cars.price_per_day || 'N/A'}</p>
                                                <p><strong>Total_price:</strong> ${cars.total_price || 'N/A'}</p>
                                            </div>
                                        </div>              
                                        <button class="book-now">Book Now</button>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="close-modal">Close</button>
                        </div>
                    `;
                }
                
                h_h_resultsContainer.appendChild(h_h_modal);
                
                // Add event listeners to all "Book Now" buttons
                const bookButtons = h_h_modal.querySelectorAll('.book-now');
                bookButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        alert('Booking functionality will be implemented soon!');
                    });
                });
                
                // Close modal button
                const closeButton = h_h_modal.querySelector('.close-modal');
                if (closeButton) {
                    closeButton.addEventListener('click', () => h_h_modal.remove());
                }
            })
            .catch(error => {
                console.error('Error fetching hotel data:', error);
                
                // Remove loading indicator
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }
                
                // Show error message
                const errorModal = document.createElement('div');
                errorModal.className = 'modal';
                errorModal.innerHTML = `
                    <div class="modal-content">
                        <h2>Error</h2>
                        <p>Failed to load hotel data. Please try again later.</p>
                        <p>Error: ${error.message}</p>
                        <button class="close-modal">Close</button>
                    </div>
                `;
                h_h_resultsContainer.appendChild(errorModal);
                
                // Close error modal button
                const closeButton = errorModal.querySelector('.close-modal');
                if (closeButton) {
                    closeButton.addEventListener('click', () => errorModal.remove());
                }
            });
    });
});

// ATTRACTIONS & TOURS search results
document.addEventListener('DOMContentLoaded', function() {  
    // Add another cars button functionality
    const h_h_resultsContainer = document.getElementById('att_results');
    const h_h_searchBtn = document.getElementById('att_search-button');
    
    // Check if elements exist
    if (!h_h_resultsContainer || !h_h_searchBtn) {
        console.error('Missing required elements for hotel search');
        return;
    }

    // fetch & show results data
    h_h_searchBtn.addEventListener('click', function () {        
        fetch('/json%20files/attractions&Tours.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {                
                // Create modal
                const h_h_modal = document.createElement('div');
                h_h_modal.className = 'modal';
                
                // Check if data and results exist
                if (!data || !data.results || !Array.isArray(data.results)) {
                    h_h_modal.innerHTML = `
                        <div class="modal-content">
                            <h2>Error</h2>
                            <p>No hotel results found or invalid data format.</p>
                            <button class="close-modal">Close</button>
                        </div>
                    `;
                } else {
                    h_h_modal.innerHTML = `
                        <div class="modal-content">
                            <h2>Attractions & Tours</h2>
                            <div class="results-list">
                                ${data.results.map(services => `
                                    <div class="cars-card">
                                        <div class="make_horizontal">
                                            <img class ="image_results" src="${services.image_url}" alt="${services.car_model}" onerror="this.src='placeholder.jpg'">
                                            <div class="cars-info">
                                                <div class="cars-header">
                                                    <strong>${services.name}</strong> 
                                                </div>
                                                <p><strong>Rating:</strong> ${services.rating || 'N/A'}</p>
                                                <p><strong>Category:</strong> ${services.category || 'N/A'}</p>
                                                <p><strong>Location:</strong> ${services.location || 'N/A'}</p>
                                                <p><strong>Availability:</strong> ${services.availability || 'N/A'}</p>
                                                <p><strong>Price:</strong> ${services.price_php || 'N/A'}</p>
                                            </div>
                                        </div>              
                                        <button class="book-now">Book Now</button>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="close-modal">Close</button>
                        </div>
                    `;
                }
                
                h_h_resultsContainer.appendChild(h_h_modal);
                
                // Add event listeners to all "Book Now" buttons
                const bookButtons = h_h_modal.querySelectorAll('.book-now');
                bookButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        alert('Booking functionality will be implemented soon!');
                    });
                });
                
                // Close modal button
                const closeButton = h_h_modal.querySelector('.close-modal');
                if (closeButton) {
                    closeButton.addEventListener('click', () => h_h_modal.remove());
                }
            })
            .catch(error => {
                console.error('Error fetching hotel data:', error);
                
                // Remove loading indicator
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }
                
                // Show error message
                const errorModal = document.createElement('div');
                errorModal.className = 'modal';
                errorModal.innerHTML = `
                    <div class="modal-content">
                        <h2>Error</h2>
                        <p>Failed to load hotel data. Please try again later.</p>
                        <p>Error: ${error.message}</p>
                        <button class="close-modal">Close</button>
                    </div>
                `;
                h_h_resultsContainer.appendChild(errorModal);
                
                // Close error modal button
                const closeButton = errorModal.querySelector('.close-modal');
                if (closeButton) {
                    closeButton.addEventListener('click', () => errorModal.remove());
                }
            });
    });
});

// FLIGHT & Hotels search results
document.addEventListener('DOMContentLoaded', function() {  
    // Add flight & hotels button functionality
    const f_h_resultsContainer = document.getElementById('f_h_results');
    const f_h_searchBtn = document.getElementById('f_h_search-button');
    
    // Check if elements exist
    if (!f_h_resultsContainer || !f_h_searchBtn) {
        console.error('Missing required elements for flight & hotel search');
        return;
    }

    // fetch & show results data
    f_h_searchBtn.addEventListener('click', function () {

        
        fetch('/json%20files/flight+hotels.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                // Create modal
                const f_h_modal = document.createElement('div');
                f_h_modal.className = 'modal';
                
                // Check if data and results exist
                if (!data || !data.results || !Array.isArray(data.results)) {
                    f_h_modal.innerHTML = `
                        <div class="modal-content">
                            <h2>Error</h2>
                            <p>No flight & hotel packages found or invalid data format.</p>
                            <button class="close-modal">Close</button>
                        </div>
                    `;
                } else {
                    f_h_modal.innerHTML = `
                        <div class="modal-content">
                            <h2>Flight with Hotel Packages</h2>
                            <div class="results-list">
                                ${data.results.map(pack => `
                                    <div class="package-card">
                                        <div class="make_horizontal">
                                            <img class="image_results" src="${pack.image_url}" alt="${pack.hotel_name}" onerror="this.src='placeholder.jpg'">
                                            <div class="flight-info">
                                                <div class="flight-header">
                                                    <strong>${pack.flight.airline}</strong> 
                                                </div>
                                                <p><strong>From:</strong> ${pack.flight.from || 'N/A'}</p>
                                                <p><strong>To:</strong> ${pack.flight.to || 'N/A'}</p>
                                                <p><strong>Departure:</strong> ${formatDateTime(pack.flight.departure) || 'N/A'}</p>
                                                <p><strong>Arrival:</strong> ${formatDateTime(pack.flight.arrival) || 'N/A'}</p>
                                            </div>
                                        </div>
                                        
                                        <div class="make_horizontal hotel-section">
                                            <div class="hotel-info">
                                                <div class="hotel-header">
                                                    <strong>${pack.hotel_name}</strong> 
                                                </div>
                                                <p><strong>Destination:</strong> ${pack.destination || 'N/A'}</p>
                                                <p><strong>Rating:</strong> ${pack.hotel_rating ? pack.hotel_rating + '/5' : 'N/A'}</p>
                                                <p><strong>Room:</strong> ${pack.room_type || 'N/A'}</p>
                                                <p><strong>Stay:</strong> ${pack.nights || 'N/A'} nights, ${pack.guests || 'N/A'}</p>
                                                <p class="price"><strong>Total Price:</strong> ${formatPrice(pack.total_price, pack.currency)}</p>
                                            </div>
                                        </div>                     
                                        <button class="book-now">Book Now</button>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="close-modal">Close</button>
                        </div>
                    `;
                }
                
                f_h_resultsContainer.appendChild(f_h_modal);
                
                // Add event listeners to all "Book Now" buttons
                const bookButtons = f_h_modal.querySelectorAll('.book-now');
                bookButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        alert('Booking functionality will be implemented soon!');
                    });
                });
                
                // Close modal button
                const closeButton = f_h_modal.querySelector('.close-modal');
                if (closeButton) {
                    closeButton.addEventListener('click', () => f_h_modal.remove());
                }
            })
            .catch(error => {
                console.error('Error fetching flight & hotel data:', error);
                
                // Remove loading indicator
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }
                
                // Show error message
                const errorModal = document.createElement('div');
                errorModal.className = 'modal';
                errorModal.innerHTML = `
                    <div class="modal-content">
                        <h2>Error</h2>
                        <p>Failed to load flight & hotel packages. Please try again later.</p>
                        <p>Error: ${error.message}</p>
                        <button class="close-modal">Close</button>
                    </div>
                `;
                f_h_resultsContainer.appendChild(errorModal);
                
                // Close error modal button
                const closeButton = errorModal.querySelector('.close-modal');
                if (closeButton) {
                    closeButton.addEventListener('click', () => errorModal.remove());
                }
            });
    });
    
    // Helper function to format date and time
    function formatDateTime(dateTimeStr) {
        if (!dateTimeStr) return 'N/A';
        
        try {
            const date = new Date(dateTimeStr);
            if (isNaN(date.getTime())) return dateTimeStr; // Return original if invalid
            
            // Format: May 10, 2025 at 08:00
            return date.toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            console.error('Date formatting error:', e);
            return dateTimeStr; // Return original on error
        }
    }
    
    // Helper function to format price
    function formatPrice(price, currency) {
        if (!price) return 'N/A';
        
        try {
            // Default to USD if currency not provided
            const currencyCode = currency || 'USD';
            
            return new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: currencyCode 
            }).format(price);
        } catch (e) {
            console.error('Price formatting error:', e);
            return price + ' ' + (currency || 'USD'); // Fallback format
        }
    }
});