async function fetchVideoDetails(videoId, placeholderId) {
    const apiKey = 'AIzaSyB81Ko-flaP1lJfNQEzy-DoEfgl0dNrnAk'; // Replace with your valid API key
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items.length > 0) {
            const title = data.items[0].snippet.title;

            // Generate streaming links
            const spotifyLink = `https://open.spotify.com/search/${encodeURIComponent(title)}`;
            const tidalLink = `https://listen.tidal.com/search/${encodeURIComponent(title)}`;
            const deezerLink = `https://www.deezer.com/search/${encodeURIComponent(title)}`;

            // Add streaming links to the corresponding placeholder
            const linksContainer = document.getElementById(placeholderId);
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
        }
    } catch (error) {
        console.error('Error fetching video details:', error);
    }
}

// Fetch details for both YouTube videos
document.addEventListener('DOMContentLoaded', () => {
    fetchVideoDetails('LhbpdFVJbqo', 'streaming-links-1'); // First video
    fetchVideoDetails('exampleVideoId2', 'streaming-links-2'); // Second video
});
