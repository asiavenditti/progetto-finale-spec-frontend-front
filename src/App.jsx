
import './style/App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CarsListPage from './pages/CarsListPage'
import DetailPage from './pages/DetailPage'
import ComparePage from './pages/ComparePage'
import DefaultLayout from './layout/DefaultLayout'
import GlobalProvider from './context/GlobalContext'

function App() {


  return (

    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/cars' element={<CarsListPage />} />
            <Route path='/cars/:id' element={<DetailPage />} />
            <Route path='/compare' element={<ComparePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>

  )
}

export default App
