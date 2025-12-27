import { useContext, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import '../style/CarsList.css';
import CarCard from '../components/carCard';
// debounce 
const debounce = (callback, delay) => {
    let timer
    return (value) => {
        // reset
        clearTimeout(timer)
        timer = setTimeout(() => {
            // aggiornamento dello stato dopo il delay
            callback(value)
        }, delay)
    }
}

export default function CarsListPage() {
    const { data, loading, error, favorites, toggleFavorite } = useContext(GlobalContext);

    // stato per la ricerca
    const [searchTerm, setSearchTerm] = useState('');
    // stato per filtro categoria
    const [categoryFilter, setCategoryFilter] = useState('');
    // stato per ordinamento
    const [sortBy, setSortBy] = useState('title-asc');

    // funzione debounced con useCallback
    const debounceSetSearch = useCallback(
        debounce(setSearchTerm, 500),
        []
    );

    // ottengo le categorie 
    const categories = (() => {
        if (!data) return [];
        return [...new Set(data.map(car => car.category))];
    })();

    // filtro e ordinamento con useMemo
    const filteredAndSortedCars = useMemo(() => {
        if (!data) return [];

        // filtro per titolo e categoria
        let result = [...data].filter(car => {
            const matchesSearch = car.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesCategory = categoryFilter
                ? car.category === categoryFilter
                : true;

            return matchesSearch && matchesCategory;
        });

        // ordinamento in base alla selezione
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

    // colori per i badge delle categorie
    const categoryColors = {
        Berlina: 'primary',
        SUV: 'success',
        Sportiva: 'danger',
        Citycar: 'warning',
        'Station Wagon': 'info',
        Crossover: 'secondary',
    };

    // stato di caricamento
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3 text-muted">Caricamento automobili...</p>
            </div>
        );
    }

    // gestione errori
    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5">
                <h4>Errore nel caricamento</h4>
                <p>{error}</p>
            </div>
        );
    }

    // stato vuoto
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
                        onChange={e => debounceSetSearch(e.target.value)}
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
                        <option value="title-asc">Titolo A-Z</option>
                        <option value="title-desc">Titolo Z-A</option>
                        <option value="category-asc">Categoria A-Z</option>
                        <option value="category-desc">Categoria Z-A</option>
                    </select>
                </div>
            </div>

            {/* Lista risultati */}
            {filteredAndSortedCars.length === 0 ? (
                <div className="alert alert-info text-center">
                    Nessun risultato trovato. Prova a modificare i filtri.
                </div>
            ) : (
                <div className="row g-4">
                    {filteredAndSortedCars.map(car => (
                        <div key={car.id} className="col-sm-6 col-md-4 col-lg-3">
                            <CarCard
                                car={car}
                                isFavorite={favorites.includes(car.id)}
                                toggleFavorite={() => toggleFavorite(car.id)}
                                categoryColors={categoryColors}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}