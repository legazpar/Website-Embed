require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const apiKey = process.env.API_KEY;  // Ensure your API key is in the .env file

// Serve frontend assets (optional, if you're not using a separate server for static files)
app.use(express.static('public'));  // This serves your frontend if necessary

// API route to handle video details fetch
app.get('/api/video-details', async (req, res) => {
    const videoId = req.query.videoId; // Get videoId from query string
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);  // Send back the video details to the frontend
    } catch (error) {
        console.error("Error fetching video details:", error.message);
        res.status(500).json({ error: `Error fetching video details: ${error.message}` });
    }
});

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
