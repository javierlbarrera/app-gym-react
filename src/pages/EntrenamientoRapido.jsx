import './EntrenamientoRapido.css'
import { NavLink } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { EntrenamientoContexto } from '../context/EntrenamientoContexto.jsx'
import { Ejercicio } from '../components/Ejercicio.jsx'
import { useNavigate } from 'react-router-dom'

export const EntrenamientoRapido = () => {

    const { ejercicios, horaInicio } = useContext(EntrenamientoContexto) // Aquí estoy usando el contexto para importar dos estados
    const navigate = useNavigate()

    let duracion = Math.round((Date.now() - horaInicio) / 60000) //La hora de inicio se guarda en el contexto al iniciar el entrenamiento, y al guardar el entrenamiento se resta a la hora a la que se ha guardado

    useEffect(()=>{
        console.clear()
        console.log(duracion)
    },[])

    const totalVolumen = ejercicios.reduce((total, ejercicio) => { //suma el volumen de cada ejercicio para sacar el total. ChatGPT.
        const volumenEjercicio = ejercicio.series.reduce((subtotal, serie) => {
          const peso = parseFloat(serie.peso) || 0
          const reps = parseFloat(serie.repeticiones) || 0
          return subtotal + peso * reps
        }, 0)
        return total + volumenEjercicio
      }, 0)

    const guardarEntrenamiento  = async ()=>{
        // try catch finally 
        const entrenamiento = {
            nombre : 'Entrenamiento rápido',
            usuario : 'Usuario de prueba',
            volumen : totalVolumen,
            duracion,
            ejercicios,
        }

        const peticion = await fetch('http://localhost:3000/entrenamientos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entrenamiento)
        })
        const datos = await peticion.json()

        navigate ('/')
    }


    return (
        <>
            <header>
                <h1>Entrenamiento rápido</h1>
            </header>
            <section className="EntrenamientoRapido__datos">
                <div className="Datos_container">
                    <div className="Datos">
                        <p>Tiempo</p>
                        <p className='Datos__valor'>X minutos</p>
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
                <NavLink to="/selector-ejercicios"> {/* cambiar a navigate */}
                    <button>
                        + Añade un ejercicio
                    </button>
                </NavLink>
                <button className='Boton__final' onClick={guardarEntrenamiento}> 
                    ✓ Terminar entrenamiento
                </button>
            </div>
        </>
    )
}
