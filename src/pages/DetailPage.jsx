import { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { Heart, HeartFill, ArrowLeft } from 'react-bootstrap-icons';
import useFetch from '../hooks/useFetch';
import '../style/CarDetail.css';

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // estrazione dal context
    const { favorites, toggleFavorite, toggleCompare, isInCompare } = useContext(GlobalContext);

    const API_URL = import.meta.env.VITE_API_URL;
    const { data, loading, error } = useFetch(`${API_URL}/cars/${id}`);

    const car = data?.car;

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3 text-muted">Caricamento dettagli...</p>
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="text-center">
                            {/* Immagine */}
                            <img
                                src="/images/404.png"
                                alt="Auto non trovata"
                                className="img-fluid mb-3"
                                style={{ maxWidth: '280px' }}
                            />

                            {/* Card */}
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <h3 className="card-title mb-2 fw-bold">
                                        ⚠️ Automobile non trovata
                                    </h3>
                                    <p className="card-text text-muted mb-3">
                                        L'auto che stai cercando non esiste nel nostro catalogo.
                                    </p>
                                    <Link to="/cars" className="btn btn-primary">
                                        Torna al Catalogo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    const isFavorite = favorites.includes(car.id);
    const isInComparison = isInCompare(car.id);

    return (
        <div className="container py-5">
            <button
                onClick={() => navigate(-1)}
                className="back-btn-detail"
            >
                <ArrowLeft />
                <span>Torna indietro</span>
            </button>

            <div className="detail-card-wrapper">
                <div className="image-section-detail">
                    <div className="badges-detail">
                        <span className="category-badge-detail">{car.category}</span>

                        {/* Bottone confronto */}
                        <div className="text-center my-4">
                            <button
                                className={`custom-compare-btn ${isInComparison ? 'is-active' : ''}`}
                                onClick={() => toggleCompare(car)}
                            >
                                {isInComparison ? '✖ Rimuovi dal confronto' : ' Aggiungi al confronto'}
                            </button>
                        </div>
                        <button
                            className="favorite-btn-detail"
                            onClick={() => toggleFavorite(car.id)}
                        >
                            {isFavorite ? <HeartFill /> : <Heart />}
                        </button>
                    </div>

                    <div className="car-image-container-detail">
                        <img
                            src={car.image}
                            alt={car.title}
                            className="car-image-detail"
                        />
                    </div>

                    <div className="header-info-detail">
                        <h1 className="car-title-detail">{car.title}</h1>
                        <p className="car-brand-detail">{car.brand}</p>
                        <div className="price-detail">€ {car.price.toLocaleString('it-IT')}</div>
                    </div>

                </div>

                <div className="info-section-detail">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="info-block-detail">
                                <h3 className="info-title-detail">Descrizione</h3>
                                <p className="description-text-detail">{car.description}</p>
                            </div>

                            <div className="info-block-detail">
                                <h3 className="info-title-detail">Specifiche Tecniche</h3>
                                <div className="specs-list-detail">
                                    <div className="spec-row-detail">
                                        <span className="spec-label-detail">Anno</span>
                                        <span className="spec-value-detail">{car.year}</span>
                                    </div>
                                    <div className="spec-row-detail">
                                        <span className="spec-label-detail">Alimentazione</span>
                                        <span className="spec-value-detail">{car.fuelType}</span>
                                    </div>
                                    <div className="spec-row-detail">
                                        <span className="spec-label-detail">Potenza</span>
                                        <span className="spec-value-detail">{car.horsepower} CV</span>
                                    </div>
                                    <div className="spec-row-detail">
                                        <span className="spec-label-detail">Trasmissione</span>
                                        <span className="spec-value-detail">{car.transmission}</span>
                                    </div>
                                    <div className="spec-row-detail">
                                        <span className="spec-label-detail">Posti</span>
                                        <span className="spec-value-detail">{car.seats}</span>
                                    </div>
                                    {car.rating && (
                                        <div className="spec-row-detail">
                                            <span className="spec-label-detail">Valutazione</span>
                                            <span className="spec-value-detail">⭐ {car.rating}/5</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="info-block-detail">
                                <h3 className="info-title-detail">Colori Disponibili</h3>
                                <div className="colors-grid-detail">
                                    {car.colors.map((color, index) => (
                                        <span key={`${color}-${index}`} className="color-badge-detail">
                                            {color}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="info-block-detail">
                                <h3 className="info-title-detail">Dotazioni di Serie</h3>
                                <div className="features-grid-detail">
                                    {car.features.map((feature, index) => (
                                        <div key={index} className="feature-item-detail">
                                            <span className="feature-check-detail">✓</span>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}