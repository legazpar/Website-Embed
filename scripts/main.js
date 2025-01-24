// Fetch video details
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

// Fetch details for YouTube videos
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
    }, 500); // Fade-out effect
});

// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const darkModeEnabled = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
    });
});

// Search bar toggle
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


document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const statusText = document.getElementById("game-status");
    const restartBtn = document.getElementById("restart-btn");

    let isXTurn = true;
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWin = (currentClass) => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    };

    const checkDraw = () => {
        return [...cells].every(cell => {
            return cell.classList.contains("x") || cell.classList.contains("o");
        });
    };

    const handleClick = (e) => {
        const cell = e.target;
        const currentClass = isXTurn ? "x" : "o";

        cell.classList.add(currentClass);
        cell.textContent = currentClass.toUpperCase();

        if (checkWin(currentClass)) {
            statusText.textContent = `${currentClass.toUpperCase()} Wins! 🎉`;
            gameActive = false;
        } else if (checkDraw()) {
            statusText.textContent = "It's a Draw! 🤝";
            gameActive = false;
        } else {
            isXTurn = !isXTurn;
            statusText.textContent = `Turn: ${isXTurn ? "X" : "O"}`;
        }
    };

    const startGame = () => {
        isXTurn = true;
        gameActive = true;
        statusText.textContent = "Turn: X";

        cells.forEach(cell => {
            cell.classList.remove("x", "o");
            cell.textContent = "";
            cell.addEventListener("click", handleClick, { once: true });
        });
    };

    restartBtn.addEventListener("click", startGame);

    startGame();
});
