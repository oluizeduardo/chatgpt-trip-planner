/* eslint-disable no-undef */
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('cidade').value = data.address.city || data.address.town || data.address.village;
            })
            .catch(error => console.error('Error fetching city name:', error));
    });
} else {
    console.error('Geolocation is not supported by this browser.');
}