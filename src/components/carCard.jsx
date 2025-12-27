import { Link } from 'react-router-dom';
import '../style/CarsList.css';
import { Heart, HeartFill } from 'react-bootstrap-icons';

export default function CarCard({ car, isFavorite, toggleFavorite, categoryColors }) {
    return (
        <div className="car-card">
            <span className={`category-badge bg-${categoryColors[car.category]}`}>
                {car.category}
            </span>

            <button className="favorite-btn" onClick={toggleFavorite}>
                {isFavorite ? <HeartFill /> : <Heart />}
            </button>

            <div className="car-card-body">
                <h5 className="car-title">{car.title}</h5>
                <Link to={`/cars/${car.id}`} className="btn btn-outline-primary w-100">
                    Vedi Dettagli
                </Link>
            </div>
        </div>
    );
}
