import React from 'react';
import '../style/HomePage.css';

export default function HomePage() {
    return (
        <div className="home-page">
            {/* hero*/}
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Trova l’auto perfetta per te</h1>
                    <p>Esplora decine di modelli, confronta caratteristiche e scopri l'auto che fa per te.</p>
                    <button className="cta-btn">ESPLORA</button>
                </div>
            </div>

            {/* bottom section */}
            <div className="mockup-section">
                <img src="/images/cars-mockup.jpg" alt="Cars mockup" className="mockup-image" />
            </div>
        </div>
    );
}
