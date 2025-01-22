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

// Fetch video details from the backend proxy
async function fetchVideoDetails(videoId, containerId) {
    const url = `http://localhost:3000/api/video-details?videoId=${videoId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.items.length > 0) {
            const title = data.items[0].snippet.title;

            // Generate streaming links
            const spotifyLink = `https://open.spotify.com/search/${encodeURIComponent(title)}`;
            const tidalLink = `https://listen.tidal.com/search/${encodeURIComponent(title)}`;
            const deezerLink = `https://www.deezer.com/search/${encodeURIComponent(title)}`;

            const linksContainer = document.getElementById(containerId);
            linksContainer.innerHTML = `
                <p>Listen on:</p>
                <div class="streaming-container">
                    <a href="${spotifyLink}" target="_blank" class="streaming-button">
                        <img src="assets/spotify-logo.png" alt="Spotify" class="streaming-logo">
                    </a>
                    <a href="${deezerLink}" target="_blank" class="streaming-button">
                        <img src="assets/deezer-logo.png" alt="Deezer" class="streaming-logo">
                    </a>
                    <a href="${tidalLink}" target="_blank" class="streaming-button">
                        <img src="assets/tidal-logo.png" alt="Tidal" class="streaming-logo">
                    </a>
                </div>
            `;
        } else {
            console.warn('No video details found.');
        }
    } catch (error) {
        console.error('Error fetching video details:', error);
    }
}

// Fetch and append links for both videos
fetchVideoDetails('LhbpdFVJbqo', 'streaming-links-1'); // First video
fetchVideoDetails('T6b9XaggWn4', 'streaming-links-2'); // Second video
