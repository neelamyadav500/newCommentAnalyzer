import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentAnalyzer from '../components/CommentAnalyzer'; 

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userName, setUserName]= useState(" ");
    const navigate = useNavigate(); 

    useEffect(()=>{
        const user = localStorage.getItem("loggedInUser");
        if(user){
            setUserName(user);
        }else{
            setIsLoggedIn(false);
        }
    },[]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        setIsLoggedIn(false); 
        navigate('/login'); 
    };

    return (
        <div className="page-container">
            {isLoggedIn && (
                <>
                    <header className="header">
                        <h2>Welcome {userName}!</h2>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </header>

                   
                    <main className="main-content">
                        <h1 className="main-heading">Analyze YouTube Comments</h1>
                        <p className="main-description">
                            Enter a YouTube video URL below to analyze the sentiment of its comments.
                        </p>

                        <CommentAnalyzer />
                    </main>
                </>
            )}
            {!isLoggedIn && <p>You have logged out. Please log in again to use the analyzer.</p>}
        </div>
    );
};

export default HomePage;
