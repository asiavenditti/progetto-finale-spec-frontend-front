import { createContext } from "react"



const GlobalContext = createContext()


export default function GlobalProvider({ children }) {
    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    )
}
