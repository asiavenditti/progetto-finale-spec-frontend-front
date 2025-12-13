import { createContext, useState } from "react"
import useFetch from "../hooks/useFetch"



export const GlobalContext = createContext()
const API_URL = import.meta.env.VITE_API_URL

export default function GlobalProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (carId) => {
        setFavorites(prev =>
            prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
        );
    };

    const { data, loading, error } = useFetch(`${API_URL}/cars`)
    return (
        <GlobalContext.Provider value={{ data, loading, error, favorites, toggleFavorite }}>
            {children}
        </GlobalContext.Provider>
    )
}
