import './App.css'
import { Routes, Route } from 'react-router'
import Header from './components/Header/Header'
import ThemeProvider from './components/ThemeProvider'
import Home from './pages/Home'
import PrivateRoutes from './components/PrivateRoutes'
import MenuHandler from './pages/MenuHandler'

function App() {
  return (
    <div className="app">
      <Header />
      <ThemeProvider>
        <Routes>
          {/* Rutas publicas */}
          <Route path="/" element={<Home />} />
          {/* Rutas privadas */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<MenuHandler />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
