
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const router = express.Router();
const API_KEY = process.env.REACT_APP_API_KEY; // Use the API key from .env


// Middleware for CORS
router.use(cors());

// POST route for analyzing comments based on the video ID
router.post("/analyze", async (req, res) => {
    const { videoId } = req.body;

    // Validate the input
    const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/; // YouTube video ID regex
    if (!videoId || !youtubeIdRegex.test(videoId)) {
        return res.status(400).json({ error: "A valid YouTube video ID is required." });
    }

    try {
        const comments = await fetchComments(videoId); // Fetch comments using the provided video ID
        const categorizedComments = categorizeComments(comments); // Categorize comments based on sentiment
        res.json(categorizedComments); // Return the categorized comments
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: "Failed to fetch comments." });
    }
});

// Function to fetch comments from YouTube API
const fetchComments = async (videoId) => {
    let allComments = [];
    let nextPageToken = '';

    do {
        try {
            // Request comments from YouTube API
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads`, {
                params: {
                    part: 'snippet',
                    videoId,
                    key: API_KEY,
                    maxResults: 100,
                    pageToken: nextPageToken
                }
            });

            // Check for successful response
            if (response.status !== 200) {
                console.error('YouTube API error:', response.data);
                throw new Error(`YouTube API error: ${response.status}`);
            }

            // Process the retrieved comments
            if (response.data.items) {
                const comments = response.data.items.map(item => ({
                    text: item.snippet.topLevelComment.snippet.textDisplay,
                    sentiment: getSentiment(item.snippet.topLevelComment.snippet.textDisplay) // Analyze sentiment while fetching
                }));
                allComments = allComments.concat(comments); // Combine fetched comments
            }

            // Update nextPageToken for pagination
            nextPageToken = response.data.nextPageToken;
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error; // Re-throw error to handle it in the route handler
        }
    } while (nextPageToken); // Continue fetching until no more pages

    return allComments; // Return all fetched comments
};

// Function to analyze sentiment of a given text
const getSentiment = (text) => {
    const positiveWords = ['great', 'awesome', 'good', 'nice', 'excellent', 'love', 'amazing', 'wise', 'thanks','lovely','sweet'];
    const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'dislike'];
    const negationWords = ['not', 'no', 'never', 'none'];

    const lowerCaseText = text.toLowerCase();

    // Function to detect if a negation word appears close to a sentiment word
    const hasNegation = (index, words) => {
        // Check previous three words for a negation word (for context, e.g., "not good")
        return words.slice(Math.max(0, index - 3), index).some(word => negationWords.includes(word));
    };

    // Split text into words and analyze
    const words = lowerCaseText.split(/\s+/); // Split by whitespace
    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach((word, index) => {
        // Check if word is in positive or negative words list
        if (positiveWords.includes(word) && !hasNegation(index, words)) {
            positiveCount++;
        } else if (negativeWords.includes(word) || (positiveWords.includes(word) && hasNegation(index, words))) {
            negativeCount++;
        }
    });

    // Determine sentiment based on positive and negative counts
    if (positiveCount > negativeCount) {
        return 'positive';
    } else if (negativeCount > positiveCount) {
        return 'negative';
    } else {
        return 'neutral';
    }
};

// Function to categorize comments based on their sentiment
const categorizeComments = (comments) => {
    return comments.map(comment => ({
        text: comment.text,
        sentiment: getSentiment(comment.text) // Reanalyze sentiment (optional if done during fetch)
    }));
};

module.exports = router;
