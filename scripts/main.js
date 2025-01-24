async function fetchVideoDetails(videoId, placeholderId) {
    const apiKey = 'AIzaSyB81Ko-flaP1lJfNQEzy-DoEfgl0dNrnAk'; // Replace with your valid API key
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const title = data.items[0].snippet.title;
            

            // Generate streaming links
            const spotifyLink = `https://open.spotify.com/search/${encodeURIComponent(title)}`;
            const tidalLink = `https://listen.tidal.com/search/${encodeURIComponent(title)}`;
            const deezerLink = `https://www.deezer.com/search/${encodeURIComponent(title)}`;

            // Add streaming links to the corresponding placeholder
            const linksContainer = document.getElementById(placeholderId);
            if (linksContainer) {
                linksContainer.innerHTML = `
                    <p>Listen on:</p>
                    <div class="streaming-container">
                        <a href="${spotifyLink}" target="_blank" class="streaming-button">
                            <img src="assets/spotify-logo.png" alt="Spotify" class="streaming-logo">
                        </a>
                        <a href="${tidalLink}" target="_blank" class="streaming-button">
                            <img src="assets/tidal-logo.png" alt="Tidal" class="streaming-logo">
                        </a>
                        <a href="${deezerLink}" target="_blank" class="streaming-button">
                            <img src="assets/deezer-logo.png" alt="Deezer" class="streaming-logo">
                        </a>
                    </div>
                `;
            } else {
                console.warn(`Placeholder element with ID '${placeholderId}' not found.`);
            }
        } else {
            console.warn('No video details found.');
        }
    } catch (error) {
        console.error('Error fetching video details:', error);
    }
}



// Fetch details for both YouTube videos
document.addEventListener('DOMContentLoaded', () => {
    fetchVideoDetails('LhbpdFVJbqo', 'streaming-links-1'); // First video
    fetchVideoDetails('sono4_sSB_8', 'streaming-links-2'); // Second video
});

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = 0;
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500); // Give time for fade-out effect
});


// Check if dark mode is enabled on page load
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    // Toggle dark mode and save state
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const darkModeEnabled = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
    });
});


// Search bar functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('active');
        if (!searchBar.classList.contains('hidden')) {
            searchBar.querySelector('.search-input').focus();
        }
    });
});



// Initialize the map and set its view to the desired geographical coordinates and zoom level
const map = L.map('map').setView([51.505, -0.09], 13); // Example coordinates (latitude, longitude)

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker at the specified coordinates
const marker = L.marker([51.505, -0.09]).addTo(map);
marker.bindPopup("<b>Hello!</b><br>This is a sample marker.").openPopup();
