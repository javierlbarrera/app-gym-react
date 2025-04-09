import {createContext, useState} from "react"

export const EntrenamientoContexto = createContext()

export const EntrenamientoProvider = ({ children }) => {
  const [ejercicios, setEjercicios] = useState([]);

  const añadirEjercicio = (ejercicio) => { // Función para añadir un ejercicio al estado. Pregunté a ChatGPT cómo hacerlo, de ahí el prev 
    setEjercicios((prev) => [...prev, ejercicio]);
  }

  return (
    <EntrenamientoContexto.Provider value={{ ejercicios, añadirEjercicio }}>
      {children}
    </EntrenamientoContexto.Provider>
  )
}