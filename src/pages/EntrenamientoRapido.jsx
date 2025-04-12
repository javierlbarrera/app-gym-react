import './EntrenamientoRapido.css'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { EntrenamientoContexto } from '../context/EntrenamientoContexto.jsx'
import { Ejercicio } from '../components/Ejercicio.jsx'

export const EntrenamientoRapido = () => {

    const { ejercicios } = useContext(EntrenamientoContexto) // Aquí estoy usando el contexto para importar el state

    const totalVolumen = ejercicios.reduce((total, ejercicio) => { //suma el volumen de cada ejercicio para sacar el total. ChatGPT.
        const volumenEjercicio = ejercicio.series.reduce((subtotal, serie) => {
          const peso = parseFloat(serie.peso) || 0
          const reps = parseFloat(serie.repeticiones) || 0
          return subtotal + peso * reps
        }, 0)
        return total + volumenEjercicio
      }, 0)

    return (
        <>
            <header>
                <h1>Entrenamiento rápido</h1>
            </header>
            <section className="EntrenamientoRapido__datos">
                <div className="Datos_container">
                    <div className="Datos">
                        <p>Tiempo</p>
                        <p className='Datos__valor'>58 minutos</p>
                    </div>
                    <div className="Datos">
                        <p>Volumen</p>
                        <p className='Datos__valor'>{totalVolumen} kg movidos </p>
                    </div>
                </div>
            </section>

            <section className='ListaEjercicios'>
                {ejercicios.length === 0 ? (
                    <>
                        <h3>Todavía no tienes ejercicios</h3>
                        <p>Añade un ejercicio para empezar tu entrenamiento 💪🏻</p>
                    </>
                ) : (
                    <>
                        {ejercicios.map(eachEjercicio => (
                            <Ejercicio key={eachEjercicio._id} {...eachEjercicio} />
                        ))}
                    </>
                )}
            </section>


            <div className='EntrenamientoRapido__botones'>
                <NavLink to="/selector-ejercicios">
                    <button>
                        + Añade un ejercicio
                    </button>
                </NavLink>
                <button className='Boton__final'> 
                    ✓ Terminar entrenamiento
                </button>
            </div>
        </>
    )
}
