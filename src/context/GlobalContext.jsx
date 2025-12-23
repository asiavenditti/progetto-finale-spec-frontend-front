import { createContext, useState, useEffect } from "react"
import useFetch from "../hooks/useFetch"

export const GlobalContext = createContext()
const API_URL = import.meta.env.VITE_API_URL

export default function GlobalProvider({ children }) {
    // preferiti, inizializzati dal localStorage
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites')
        return saved ? JSON.parse(saved) : []
    })

    // comparatore auto
    const [compareList, setCompareList] = useState([])

    // sincronizza favorites con localStorage ad ogni aggiornamento
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    // aggiungi o rimuovi auto dal comparatore
    const toggleCompare = (car) => {
        if (!car || !car.id) return;

        setCompareList(prev => {
            const isAlreadyIn = prev.some(c => c.id === car.id);

            if (isAlreadyIn) {
                return prev.filter(c => c.id !== car.id);
            } else {
                if (prev.length >= 2) {
                    alert("Puoi confrontare solo 2 auto alla volta");
                    return prev;
                }
                return [...prev, car];
            }
        });
    };

    // pulisci il comparatore
    const clearCompare = () => setCompareList([])

    // controlla se un'auto è nel comparatore
    const isInCompare = (carId) => compareList.some(c => c.id === carId)

    // aggiungi o rimuovi dai preferiti
    const toggleFavorite = (carId) => {
        setFavorites(prev =>
            prev.includes(carId)
                ? prev.filter(id => id !== carId)
                : [...prev, carId]
        )
    }

    // dati auto dal server
    const { data, loading, error } = useFetch(`${API_URL}/cars`)

    return (
        <GlobalContext.Provider value={{
            data,
            loading,
            error,
            favorites,
            toggleFavorite,
            compareList,
            toggleCompare,
            clearCompare,
            isInCompare,
            API_URL
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
