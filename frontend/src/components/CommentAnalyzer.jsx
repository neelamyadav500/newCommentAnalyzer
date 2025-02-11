import React, { useState } from 'react';
import axios from 'axios';
import ConclusionBox from './ConclusionBox'; 

const CommentAnalyzer = () => {
    const [videoId, setVideoId] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const extractedVideoId = extractVideoId(videoId.trim());
            console.log("Extracted Video ID:", extractedVideoId);  // Log the extracted ID

            if (!extractedVideoId) {
                setError('Invalid YouTube URL. Please enter a valid URL.');
                setLoading(false);
                return;
            }

            const response = await axios.post('https://new-comment-analyzer-api.vercel.app/comments/analyze', {
                videoId: extractedVideoId,
            });

            console.log("API Response:", response);  // Log API response to check

            if (response.status === 200) {
                setComments(response.data);
                setError('');
            }
        } catch (err) {
            console.error("Error:", err);  // Log detailed error
            setError('Failed to fetch comments. Please check the video ID and try again.');
        } finally {
            setLoading(false);
        }
    };

    const extractVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s]*)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleInputChange = (event) => {
        setVideoId(event.target.value);
    };

    const handlePaste = async () => {
        navigator.clipboard.readText().then((text) => {
            setVideoId(text); 
        });
    };

    return (
        <div className="container">
            <h1>Comment Analyzer</h1>
            <div className="search-bar">
                <i 
                    onClick={handlePaste} 
                    className="fas fa-paste paste-icon" 
                    role="button" 
                    tabIndex={0} 
                    onKeyPress={(e) => e.key === 'Enter' && handlePaste()}
                    aria-label="Paste URL"
                ></i>
                <input
                    type="text"
                    value={videoId}
                    onChange={handleInputChange}
                    placeholder="Enter YouTube Video URL"
                />
            </div>
            <button onClick={handleSearch}>Analyze</button>

            {loading && (
                <div className='loading'>
                    Analyzing...
                    <div className='spinner'></div>
                </div>
            )}

            {error && <p className="error">{error}</p>}
            {comments.length > 0 && (
                <div className="full-page-result">
                    <ConclusionBox comments={comments} />
                </div>
            )}
        </div>
    );
};

export default CommentAnalyzer;
