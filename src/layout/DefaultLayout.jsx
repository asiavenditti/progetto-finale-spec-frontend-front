import Header from '../components/Header'
import Footer from '../components/Footer'
import CompareBar from '../components/CompareBar' // 1. Importa il componente
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
    return (
        <>
            <div className="app-layout">
                <Header />
                <main className="app-main">
                    <Outlet />
                </main>
                <CompareBar />

                <Footer />
            </div>
        </>
    )
}