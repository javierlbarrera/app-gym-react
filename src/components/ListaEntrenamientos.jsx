import './ListaEntrenamientos.css'
import { useState, useEffect, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { Entrenamiento } from "./Entrenamiento"
import { EntrenamientoContexto } from '../context/EntrenamientoContexto.jsx'
import { Opciones } from './Opciones.jsx'

export const ListaEntrenamientos = () => {

  const [entrenamientos, setEntrenamientos] = useState([]) //state para guardar los entrenamientos que vienen de la API
  const [opciones, setOpciones] = useState(false) //state para abrir y cerrar el menú de opciones (con editar y eliminar) de cada entrenamiento
  const [entrenamientoSeleccionado, setEntrenamientoSeleccionado] = useState(null) //state para guardar el ID pasado desde la lista de entrenamientos. Sirve para el PUT y el DELETE
  const { setEjercicios, setHoraInicio, setModoEdicion, setIdEntrenamiento, setDuracionEntrenamiento } = useContext(EntrenamientoContexto)
  const navigate = useNavigate()

  const pedirEntrenamientos = async () => { //hace un fetch a la API para conseguir los entrenamientos guardados y los guarda en el state
    const response = await fetch('http://localhost:3000/entrenamientos')
    const datos = await response.json()
    setEntrenamientos(datos)
  }

  const eliminarEntrenamiento = async () => { //hace un fetch a la API para eliminar el entrenamiento seleccionado.
    await fetch(`http://localhost:3000/entrenamientos/${entrenamientoSeleccionado}`, { method: 'DELETE' })
    cerrarOpciones() //cierra las opciones después del delete
    pedirEntrenamientos() // y refresca la lista actualizada
  }

  const editarEntrenamiento = async () => { //hacemos un fetch para conseguir los datos del entrenamiento ya guardado, y los cargamos al contexto para que la página de entrenamiento rápido pueda usarlos
    const response = await fetch(`http://localhost:3000/entrenamientos/${entrenamientoSeleccionado}`)
    const datos = await response.json()

    setEjercicios(datos.ejercicios)
    setDuracionEntrenamiento(datos.duracion) // guardamos la duración del entrenamiento en el contexto, para que la página de entrenamiento rápido pueda usarla
    setHoraInicio(datos.horaInicio)
    setModoEdicion(true) // para poder hacer el put/post de forma condicional
    setIdEntrenamiento(entrenamientoSeleccionado) // tengo que guardar el ID del entrenamiento en el contexto también, para poder mandar el PUT a la API

    cerrarOpciones()
    navigate('/entrenamiento-rapido')
  }

  const abrirOpciones = (id) => {
    setEntrenamientoSeleccionado(id)
    setOpciones(true)
  }

  const cerrarOpciones = () => {
    setOpciones(false)
  }

  useEffect(() => {
    pedirEntrenamientos()
  }, [])

  return (
    <section className="ListaEntrenamientos">
      <h3 className="Lista__titulo">Últimos entrenamientos</h3>

      {opciones && <Opciones onOpcionesCerradas={cerrarOpciones} onEliminar={eliminarEntrenamiento} onEditar={editarEntrenamiento} /> //pasamos la función de cerrar las opciones como prop, para poder cerrarlas desde el componente Opciones
      }

      {entrenamientos.length === 0 ? (
        <>
          <h3>Todavía no has empezado a guardar tus entrenamientos</h3>
          <p>Pulsa en el botón de arriba para empezar uno 💪🏻</p>
        </>
      ) : (
        <>
          {entrenamientos.map(eachEntrenamiento => (
            <Entrenamiento key={eachEntrenamiento._id} {...eachEntrenamiento} onOpcionesAbiertas={() => abrirOpciones(eachEntrenamiento._id)} /> /* pasamos props y la función de abrirOpciones */
          ))}
        </>
      )}
    </section>
  )
}