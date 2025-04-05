import './App.css'
import { Menu } from './pages/Menu'
import { Routes, Route } from 'react-router-dom';
import { EntrenamientoRapido } from './pages/EntrenamientoRapido'
import { SelectorEjercicios } from './pages/SelectorEjercicios'
import { NotFound } from './pages/NotFound'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/entrenamiento-rapido" element={<EntrenamientoRapido />} />
      <Route path="/selector-ejercicios" element={<SelectorEjercicios />} />
      <Route path="*" element={<NotFound />} />
   </Routes>
  )
}

export default App