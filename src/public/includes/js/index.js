/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function disableButton() {
    let button = document.getElementById("submit-btn");
    button.disabled = true;
    button.innerHTML = 'Criando viagem... <span class="spinner-border spinner-border-sm"></span>';
}

function initAutocomplete() {
    const input = document.getElementById("destino");
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
