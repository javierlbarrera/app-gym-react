import { Entrenamiento } from "./Entrenamiento";
import './ListaEntrenamientos.css';
import { useState, useEffect } from "react";
import { Opciones } from './Opciones.jsx';

export const ListaEntrenamientos = () => {

    const [entrenamientos, setEntrenamientos] = useState([])
    const [opciones, setOpciones] = useState(false)

    const pedirEntrenamientos = async () => {
        const response = await fetch('http://localhost:3000/entrenamientos')
        const datos = await response.json()
        setEntrenamientos(datos)
    }

    const abrirOpciones = () => {
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

          {opciones && <Opciones onOpcionesCerradas={cerrarOpciones} /> //pasamos la función de cerrar las opciones como prop, para poder cerrarlas desde el componente Opciones
          } 

          {entrenamientos.length === 0 ? (
            <>
              <h3>Todavía no tienes ejercicios</h3>
              <p>Añade un ejercicio para empezar tu entrenamiento 💪🏻</p>
            </>
          ) : (
            <>
              {entrenamientos.map(eachEntrenamiento => (
                <Entrenamiento key={eachEntrenamiento._id} {...eachEntrenamiento} onOpcionesAbiertas={abrirOpciones} /> /* pasamos props y la función de abrirOpciones */
              ))}
            </>
          )}
        </section>
    )
}