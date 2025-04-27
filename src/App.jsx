import './App.css'
import { Menu } from './pages/Menu'
import { Routes, Route } from 'react-router-dom';
import { EntrenamientoRapido } from './pages/EntrenamientoRapido'
import { SelectorEjercicios } from './pages/SelectorEjercicios'
import { NotFound } from './pages/NotFound'
import { EntrenamientoProvider } from './context/EntrenamientoContexto'
import { Login } from './pages/Login'

function App() {

  return (
    <EntrenamientoProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Menu />} />
        <Route path="/entrenamiento-rapido" element={<EntrenamientoRapido />} />
        <Route path="/selector-ejercicios" element={<SelectorEjercicios />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </EntrenamientoProvider>
  )
}

export default App