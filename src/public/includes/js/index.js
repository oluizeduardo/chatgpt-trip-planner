/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function disableButton() {
    const button = document.getElementById("submit-btn");
    if (!button) {
        console.error("Submit button not found!");
        return;
    }
    button.disabled = true;
    startLoadingAnimation(button);
}

function startLoadingAnimation(button) {
    if (!button) return;
    const messages = ["Creating trip", "Loading", "Almost there"];
    let index = 0;

    button.innerHTML = `${messages[index]}... <span class="spinner-border spinner-border-sm"></span>`;
    
    messageInterval = setInterval(() => {
        index = (index + 1) % messages.length;
        button.innerHTML = `${messages[index]}... <span class="spinner-border spinner-border-sm"></span>`;
    }, 3000);
}

function initAutocomplete() {
    const input = document.getElementById("destination");
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["(cities)"], // Only cities.
    });

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected destination: ", place.formatted_address);
    });
}

// Initialize autocomplete when the API is loaded.
document.addEventListener("DOMContentLoaded", () => {
    if (typeof google !== "undefined") {
        google.maps.event.addDomListener(window, "load", initAutocomplete);
    }
});
