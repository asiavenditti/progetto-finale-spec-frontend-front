import { createContext, useState } from "react"
import useFetch from "../hooks/useFetch"

export const GlobalContext = createContext()
const API_URL = import.meta.env.VITE_API_URL

export default function GlobalProvider({ children }) {
    // preferiti
    const [favorites, setFavorites] = useState([])
    // comparatore
    const [compareList, setCompareList] = useState([])

    // aggiungi e rimuovi dal confronto
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
    const clearCompare = () => setCompareList([]);

    const isInCompare = (carId) => {
        return compareList.some(c => c.id === carId)
    }



    const toggleFavorite = (carId) => {
        setFavorites(prev =>
            prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
        );
    };

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