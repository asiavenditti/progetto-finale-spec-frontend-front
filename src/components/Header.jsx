import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../style/Header.css';

export default function Header() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header-premium">
            <div className="container">
                <div className="header-content">
                    {/* Logo Section */}
                    <Link to="/" className="logo-section" onClick={closeMenu}>
                        <div className="logo-icon">
                            <img src="./logo.png" alt="logo" style={{ 'width': '200px' }} />
                        </div>
                        <div className="logo-text">

                            <span className="logo-sub">CAR COMPARE</span>
                        </div>
                    </Link>

                    {/* Hamburger Button (mobile) */}
                    <button
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Navigation */}
                    <nav className={`main-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
                        <Link
                            to="/"
                            className={`nav-link ${isActive('/')}`}
                            onClick={closeMenu}
                        >

                            <span>Home</span>
                        </Link>
                        <Link
                            to="/cars"
                            className={`nav-link ${isActive('/cars')}`}
                            onClick={closeMenu}
                        >

                            <span>Catalogo</span>
                        </Link>
                        <Link
                            to="/compare"
                            className={`nav-link ${isActive('/compare')}`}
                            onClick={closeMenu}
                        >

                            <span>Confronta</span>
                        </Link>


                    </nav>

                </div>
            </div>

            {/* Overlay (mobile) */}
            {isMenuOpen && (
                <div
                    className="menu-overlay"
                    onClick={closeMenu}
                ></div>
            )}
        </header>
    );
}