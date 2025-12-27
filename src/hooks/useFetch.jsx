import { useState, useEffect } from "react";

export default function useFetch(url) {

    // stati per gestire dati, caricamento ed errori
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {


        async function fetchData() {
            try {
                // reset degli stati prima della richiesta
                setLoading(true);
                setError(null);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }


                const result = await response.json();
                setData(result);

            } catch (err) {

                // gestione errore 
                setError(err.message);
                setData([]);

            } finally {

                // termina lo stato di caricamento
                setLoading(false);
            }
        }

        fetchData();

    }, [url]);

    // valori restituiti 
    return { data, loading, error };
}
