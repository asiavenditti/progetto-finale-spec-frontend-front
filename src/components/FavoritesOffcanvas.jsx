import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { X, Trash } from 'react-bootstrap-icons';
import '../style/Favorites.css';

export default function FavoritesOffcanvas({ isOpen, onClose }) {
    const { data, favorites, toggleFavorite } = useContext(GlobalContext);

    // Ottieni solo le auto nei preferiti 
    const favoriteCars = useMemo(() => {
        if (!data || !favorites.length) return [];
        return data.filter(car => favorites.includes(car.id));
    }, [data, favorites]);

    const clearAllFavorites = () => {
        if (window.confirm('Vuoi rimuovere tutti i preferiti?')) {
            favoriteCars.forEach(car => toggleFavorite(car.id));
        }
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && <div className="favorites-overlay" onClick={onClose}></div>}

            {/* Offcanvas */}
            <div className={`favorites-offcanvas ${isOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="favorites-header">
                    <h3>❤️ I Tuoi Preferiti</h3>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Contenuto */}
                <div className="favorites-body">
                    {favoriteCars.length === 0 ? (
                        <div className="empty-favorites">
                            <p>Nessun preferito ancora</p>
                            <small>Aggiungi auto cliccando sul ❤️</small>
                        </div>
                    ) : (
                        <>
                            {favoriteCars.map(car => (
                                <div key={car.id} className="favorite-card">
                                    <div className="favorite-info">
                                        <h5 className="favorite-title">{car.title}</h5>
                                        <p className="favorite-meta">
                                            <span className="favorite-category">{car.category}</span>
                                        </p>
                                    </div>

                                    <div className="favorite-actions">
                                        <Link
                                            to={`/data/${car.id}`}
                                            className="btn-detail"
                                            onClick={onClose}
                                        >
                                            Dettagli
                                        </Link>
                                        <button
                                            className="btn-remove"
                                            onClick={() => toggleFavorite(car.id)}
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Bottone svuota tutti */}
                            <button
                                className="clear-all-btn"
                                onClick={clearAllFavorites}
                            >
                                Svuota Tutti
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}