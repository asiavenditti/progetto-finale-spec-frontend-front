import React from 'react';
import { Link } from 'react-router-dom';
import '../style/HomePage.css';

export default function HomePage() {
    return (
        <div className="home-page">

            {/* Hero */}
            <section className="hero-section centered">
                <div className="hero-overlay"></div>

                <div className="hero-content centered">
                    <h1>Trova l’auto perfetta per te</h1>
                    <p>
                        Confronta varie caratteristiche e scopri
                        l'auto che fa davvero per te.
                    </p>
                    <Link to='/cars' className="cta-btn">ESPLORA</Link>
                </div>
            </section>

            {/* Mockup */}
            <section className="mockup-section">
                <img
                    src="/images/cars-mockup.jpg"
                    alt="Cars mockup"
                    className="mockup-image"
                />
            </section>

        </div>
    );
}
