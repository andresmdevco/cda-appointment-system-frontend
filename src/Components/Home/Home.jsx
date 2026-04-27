import React from 'react';
import './Home.css';

const Home = () => {
    const handleScheduleClick = () => {
        window.location.href = '/scheduling';
    };

    const handleHistoryClick = () => {
        window.location.href = '/history';
    };

    return (
        <div className="home-wrapper">
            <div className="header">
                <nav className="nav">
                    <button className="nav-button" onClick={handleHistoryClick}>History of scheduled appointments</button>
                </nav>
            </div>
            <div className="info-box">
                <h1>CDA Pradera</h1>
                <h2>Mission</h2>
                <p>At CDA Pradera, we are dedicated to the technical-mechanical inspection of private vehicles.
                    Our goal is to ensure that your vehicle complies with all safety and operating regulations,
                    giving you peace of mind and confidence in every kilometer traveled.</p>
                <h2>The Review Process</h2>
                <p><strong>Duration:</strong> 30 minutes</p>
                <p>Our experts are responsible for carrying out an exhaustive and detailed inspection of your vehicle in record time,
                ensuring efficient and high quality service.</p>
                <button className="schedule-button" onClick={handleScheduleClick}>Schedule Appointment</button>
            </div>
        </div>
    );
};

export default Home;
