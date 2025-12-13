import { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import '../style/CarsList.css'
export default function CarsListPage() {
    const { data, loading, error, favorites, toggleFavorite } = useContext(GlobalContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortBy, setSortBy] = useState('title-asc');

    // Categorie 
    const categories = useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map(car => car.category))];

    }, [data]);

    // Filtraggio e ordinamento
    const filteredAndSortedCars = useMemo(() => {
        if (!data) return [];

        // Filtro
        let result = data.filter(car => {
            const matchesSearch = car.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter ? car.category === categoryFilter : true;
            return matchesSearch && matchesCategory;
        });

        // Ordinamento
        if (sortBy === 'title-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'title-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortBy === 'category-asc') {
            result.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortBy === 'category-desc') {
            result.sort((a, b) => b.category.localeCompare(a.category));
        }

        return result;
    }, [data, searchTerm, categoryFilter, sortBy]);

    // Colori badge categorie
    const categoryColors = {
        Berlina: 'primary',
        SUV: 'success',
        Sportiva: 'danger',
        Citycar: 'warning',
        'Station Wagon': 'info',
        Crossover: 'secondary',
    };



    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3 text-muted">Caricamento automobili...</p>
            </div>
        );
    }

    // Errori

    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5">
                <h4>Errore nel caricamento</h4>
                <p>{error}</p>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return <p className="text-center mt-5 text-muted">Nessuna automobile trovata</p>;
    }

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5 display-4 fw-bold">Catalogo Vetture</h1>

            {/* Filtri */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Cerca per titolo..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                    >
                        <option value="">Tutte le categorie</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="title-asc"> Titolo A-Z</option>
                        <option value="title-desc"> Titolo Z-A</option>
                        <option value="category-asc"> Categoria A-Z</option>
                        <option value="category-desc"> Categoria Z-A</option>
                    </select>
                </div>
            </div>

            {/* Messaggio nessun risultato */}
            {filteredAndSortedCars.length === 0 ? (
                <div className="alert alert-info text-center">
                    Nessun risultato trovato. Prova a modificare i filtri.
                </div>
            ) : (
                <div className="row g-4">
                    {filteredAndSortedCars.map(car => (
                        <div key={car.id} className="col-sm-6 col-md-4 col-lg-3">
                            <div className="car-card">

                                {/* Badge categoria */}
                                <span className={`category-badge bg-${categoryColors[car.category] || 'dark'}`}>
                                    {car.category}
                                </span>

                                {/* Cuore preferiti */}
                                <button
                                    className="favorite-btn"
                                    onClick={() => toggleFavorite(car.id)}
                                >
                                    {favorites.includes(car.id) ? <HeartFill /> : <Heart />}
                                </button>

                                {/* Contenuto card */}
                                <div className="car-card-body">
                                    <h5 className="car-title">{car.title}</h5>

                                    <Link to={`/cars/${car.id}`} className="btn btn-outline-primary w-100">
                                        Vedi Dettagli
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}