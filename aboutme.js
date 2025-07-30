document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    const map = L.map('map').setView([20, 0], 2); // Set initial view to a global perspective

    // Set up the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers with animations
    const markers = [
        { lat: 23.6978, lng: 120.9605, title: 'Leon (Taiwan)' }, // Taiwan
        { lat: 36.7783, lng: -119.4179, title: 'Krish (California)' } // California
    ];

    markers.forEach((marker, index) => {
        setTimeout(() => {
            L.marker([marker.lat, marker.lng]).addTo(map)
                .bindPopup(`<b>${marker.title}</b>`)
                .openPopup();
        }, index * 1000); // Delay each marker by 1 second
    });
});

let currentIndex = 0;

function showSlide(index) {
    const slider = document.querySelector('.slider');
    const totalSlides = document.querySelectorAll('.slider-item').length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});
