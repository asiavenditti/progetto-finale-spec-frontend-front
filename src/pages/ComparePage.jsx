import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import '../style/Compare.css';

export default function ComparePage() {
    const { data, compareList, toggleCompare, clearCompare, API_URL } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);

    const firstCar = compareList[0];
    const secondCar = compareList[1];
    const bothSelected = firstCar && secondCar;

    const propLabels = {
        title: 'Modello',
        category: 'Categoria',
        brand: 'Marca',
        price: 'Prezzo',
        year: 'Anno',
        fuelType: 'Alimentazione',
        horsepower: 'Potenza',
        transmission: 'Trasmissione',
        seats: 'Posti',
        description: 'Descrizione',
        colors: 'Colori',
        features: 'Dotazioni',
        rating: 'Valutazione'
    };

    const compareProps = Object.keys(propLabels);

    const formatValue = (key, value) => {
        if (value === null || value === undefined) return '-';
        if (key === 'price') return `€ ${value.toLocaleString('it-IT')}`;
        if (key === 'horsepower') return `${value} CV`;
        if (key === 'rating') return `⭐ ${value}/5`;
        if (Array.isArray(value)) return value.join(', ');
        return value;
    };

    const handleSelectChange = async (e, index) => {
        const selectedId = parseInt(e.target.value);

        if (!selectedId) return;

        setLoading(true);

        try {
            // Fetch del record completo con tutte le proprietà
            const response = await fetch(`${API_URL}/cars/${selectedId}`);
            const result = await response.json();
            const fullCarObject = result.car;

            // Rimuovo l'auto precedente in quella posizione
            if (compareList[index]) {
                toggleCompare(compareList[index]);
            }

            // Aggiungo la nuova auto con tutte le proprietà
            if (fullCarObject) {
                setTimeout(() => {
                    toggleCompare(fullCarObject);
                }, 10);
            }
        } catch (error) {
            console.error('Errore nel caricamento dell\'auto:', error);
            alert('Errore nel caricamento dell\'automobile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="compare-header">
                <h1 className="compare-title"> Confronta Automobili</h1>
                {compareList.length > 0 && (
                    <button className="clear-compare-btn" onClick={clearCompare}>
                        Svuota Confronto
                    </button>
                )}
            </div>

            <div className="selectors-row">
                <div className="selector-box">
                    <label>Prima Automobile</label>
                    <select
                        value={firstCar?.id || ''}
                        onChange={(e) => handleSelectChange(e, 0)}
                        className="car-select"
                        disabled={loading}
                    >
                        <option value="">Seleziona un'auto...</option>
                        {data?.map(car => (
                            <option key={car.id} value={car.id} disabled={car.id === secondCar?.id}>
                                {car.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="vs-divider">VS</div>

                <div className="selector-box">
                    <label>Seconda Automobile</label>
                    <select
                        value={secondCar?.id || ''}
                        onChange={(e) => handleSelectChange(e, 1)}
                        className="car-select"
                        disabled={loading}
                    >
                        <option value="">Seleziona un'auto...</option>
                        {data?.map(car => (
                            <option key={car.id} value={car.id} disabled={car.id === firstCar?.id}>
                                {car.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary"></div>
                </div>
            )}

            {!bothSelected && !loading && (
                <div className="empty-compare">
                    <p>Seleziona 2 automobili per confrontarle</p>
                </div>
            )}

            {bothSelected && (
                <div className="comparison-container">
                    <div className="images-row">
                        <div className="car-image-box">
                            <img src={firstCar.image} alt={firstCar.title} className="compare-car-image" />
                        </div>
                        <div className="car-image-box">
                            <img src={secondCar.image} alt={secondCar.title} className="compare-car-image" />
                        </div>
                    </div>

                    <div className="comparison-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Proprietà</th>
                                    <th>{firstCar.title}</th>
                                    <th>{secondCar.title}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {compareProps.map(prop => (
                                    <tr key={prop}>
                                        <td className="prop-label">{propLabels[prop]}</td>
                                        <td className="prop-value">{formatValue(prop, firstCar[prop])}</td>
                                        <td className="prop-value">{formatValue(prop, secondCar[prop])}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}