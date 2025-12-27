import { Link, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import FavoritesOffcanvas from './FavoritesOffcanvas';
import '../style/Header.css';

export default function Header() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { favorites, compareList } = useContext(GlobalContext);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const isActive = (path) => (location.pathname === path ? 'active' : '');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Per animare il badge al cambio numero (opzionale)
    const [favCount, setFavCount] = useState(favorites.length);
    const [compareCount, setCompareCount] = useState(compareList.length);

    useEffect(() => {
        if (favorites.length !== favCount) {
            setFavCount(favorites.length);
        }
    }, [favorites, favCount]);

    useEffect(() => {
        if (compareList.length !== compareCount) {
            setCompareCount(compareList.length);
        }
    }, [compareList, compareCount]);

    return (
        <>
            <header className="header-premium">
                <div className="container">
                    <div className="header-content">
                        {/* Logo Section */}
                        <Link to="/" className="logo-section" onClick={closeMenu}>
                            <div className="logo-icon">
                                <img src="/logo.png" alt="logo" style={{ width: '200px' }} />
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

                            {/* Confronta con badge affiancato */}
                            <Link
                                to="/compare"
                                className={`nav-link compare ${isActive('/compare')}`}
                                onClick={closeMenu}
                            >
                                <span>Confronta</span>
                                {compareList.length > 0 && (
                                    <span className="badge-inline">{compareList.length}</span>
                                )}
                            </Link>

                            {/* Preferiti con badge affiancato */}
                            <button
                                className="favorites-toggle"
                                onClick={() => {
                                    setIsOffcanvasOpen(true);
                                    closeMenu();
                                }}
                            >
                                <span>❤️ Preferiti</span>
                                {favorites.length > 0 && (
                                    <span className="badge-inline">{favorites.length}</span>
                                )}
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Overlay (mobile) */}
                {isMenuOpen && (
                    <div className="menu-overlay" onClick={closeMenu}></div>
                )}
            </header>

            {/* Offcanvas Preferiti */}
            <FavoritesOffcanvas
                isOpen={isOffcanvasOpen}
                onClose={() => setIsOffcanvasOpen(false)}
            />
        </>
    );
}
