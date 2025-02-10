// Get references to DOM elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.querySelector(".search-input");
const searchResultsContainer = document.getElementById("card-container");

// Function to load JSON and handle search
async function loadDestinations() {
  try {
    const response = await fetch("travel_recom.json"); // Load JSON file
    const travelData = await response.json(); // Store as is

    // Add event listener after loading data
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.toLowerCase().trim();
      displaySearchResults(query, travelData);
    });
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

// Function to search and display results (Only by Name & Category)
function displaySearchResults(query, travelData) {
  searchResultsContainer.innerHTML = ""; // Clear previous results
  let results = [];

  // Iterate through JSON as-is
  Object.entries(travelData).forEach(([category, items]) => {
    items.forEach((item) => {
      if (item.cities) {
        // If it's a country, search inside its cities
        item.cities.forEach((city) => {
          if (
            city.name.toLowerCase().includes(query) ||
            category.toLowerCase().includes(query)
          ) {
            results.push(city);
          }
        });
      } else {
        // Otherwise, search normally
        if (
          item.name.toLowerCase().includes(query) ||
          category.toLowerCase().includes(query)
        ) {
          results.push(item);
        }
      }
    });
  });

  // If no results found
  if (results.length === 0) {
    searchResultsContainer.innerHTML = `<p>No destinations found for "${query}".</p>`;
    return;
  }

  // Render results
  results.forEach((item) => {
    const cardHtml = `
      <div class="main-card">
        <img src="${item.imageUrl}" alt="${item.name}">
        <div class="card-content">
          <h3 class="card-title">${item.name}</h3>
          <p class="card-description">${item.description}</p>
          <a href="#" class="card-button">Visit</a>
        </div>
      </div>
    `;
    searchResultsContainer.insertAdjacentHTML("beforeend", cardHtml);
  });
}

// Load destinations on page load
loadDestinations();
