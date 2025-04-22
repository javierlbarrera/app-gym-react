import { createContext, useEffect, useState } from "react"

export const EntrenamientoContexto = createContext()

export const EntrenamientoProvider = ({ children }) => {
  const [ejercicios, setEjercicios] = useState([])
  const [horaInicio, setHoraInicio] = useState(null) //un estado para guardar la hora de inicio que se calcula al finalizar el entrenamiento.


  const añadirEjercicio = (ejercicio) => { // Función para añadir un ejercicio al estado. Pregunté a ChatGPT cómo hacerlo, de ahí el prev 
    setEjercicios((prev) => [...prev, ejercicio])
  }

  const eliminarEjercicio = (_id) => { // Función para eliminar un ejercicio del estado. Recibe el id del ejercicio a eliminar.
    setEjercicios(prev => prev.filter(eachEjercicio => eachEjercicio._id !== _id)) // Filtra los ejercicios y elimina el que tiene el id recibido.
  }

  const actualizarEjercicio = (_id, data) => { //esta función recibe el ID del ejercicio y el nuevo valor de este: editando: false o true.
    setEjercicios(prev => //coge los valores previos
      prev.map((eachEjercicio) => eachEjercicio._id === _id ? { ...eachEjercicio, ...data } : eachEjercicio) //y les hace un map.
      // si el id coincide, actualiza el ejercicio con el nuevo valor. Si no, lo deja igual.
    )
  }

  const actualizarSeries = (_id, nuevasSeries) => { // esta función hace lo mismo pero para actualizar las series de un ejercicio. La idea es guardar las series en el contexto para que no se pierdan.
    // Recibe el id del ejercicio y el nuevo array de series.
    setEjercicios(prev => //coge los valores previos
      prev.map(eachEjercicio => // les hace un map
        eachEjercicio._id === _id ? { ...eachEjercicio, series: nuevasSeries } : eachEjercicio
        // si el id coincide, actualiza el ejercicio con el nuevo array de series. Si no, lo deja igual.
      )
    )
  }

  return (
    <EntrenamientoContexto.Provider value={{ ejercicios, horaInicio, setHoraInicio, añadirEjercicio, eliminarEjercicio, actualizarEjercicio, actualizarSeries }}>
      {children}
    </EntrenamientoContexto.Provider>
  )
}