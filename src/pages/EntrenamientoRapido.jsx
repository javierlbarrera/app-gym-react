import './EntrenamientoRapido.css'
import { NavLink } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { EntrenamientoContexto } from '../context/EntrenamientoContexto.jsx'
import { Ejercicio } from '../components/Ejercicio.jsx'
import { useNavigate } from 'react-router-dom'

export const EntrenamientoRapido = () => {

    const {VITE_EXPRESS_URL} = import.meta.env
    const [tiempoActual, setTiempoActual] = useState(0)
    const { ejercicios, horaInicio, modoEdicion, duracionEntrenamiento, idEntrenamiento, setEjercicios, setHoraInicio, setModoEdicion, setIdEntrenamiento } = useContext(EntrenamientoContexto)
    const navigate = useNavigate()

    const duracion = modoEdicion ? duracionEntrenamiento : Math.round(tiempoActual / 60000) // si el modo de edición está activo, la duración es la que se pasa desde el contexto. Si no, es la calculada con el timer creado en el useEffect.

    const totalVolumen = ejercicios.reduce((total, ejercicio) => { //suma el volumen de cada ejercicio para sacar el total. ChatGPT.
        const volumenEjercicio = ejercicio.series.reduce((subtotal, serie) => {
            const peso = parseFloat(serie.peso) || 0
            const reps = parseFloat(serie.repeticiones) || 0
            return subtotal + peso * reps
        }, 0)
        return total + volumenEjercicio
    }, 0)

    const guardarEntrenamiento = async () => { //hace POST o PUT dependiendo del estado importado del contexto 
        const entrenamiento = {
            nombre: 'Entrenamiento rápido',
            usuario: 'Usuario de prueba',
            volumen: totalVolumen,
            duracion,
            ejercicios,
        }

        const url = modoEdicion // si el modo de edición está activo, significa que se va a editar un entrenamiento ya guardado, por lo que la URL será diferente
            ? `${VITE_EXPRESS_URL}/entrenamientos/${idEntrenamiento}`
            : `${VITE_EXPRESS_URL}/entrenamientos`

        const method = modoEdicion ? 'PUT' : 'POST' // si el modo de edición está activo, se hace un PUT, si no, un POST

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entrenamiento),
            })
        } catch (error) {
            console.error('Error al guardar el entrenamiento:', error)
        } finally {

            // Limpieza después de guardar
            setEjercicios([])
            setHoraInicio(null)
            setModoEdicion(false)
            setIdEntrenamiento(null)

            navigate('/inicio')
        }
    }

    useEffect(() => { // useEffect para mostrar en la app el tiempo transcurrido desde que se inició el entrenamiento. Se ejecuta cada segundo y solo si no está en modo de edición.
        if (horaInicio) {
            const intervalo = setInterval(() => {
                const ahora = Date.now()
                const diferencia = ahora - horaInicio
                setTiempoActual(diferencia)
            }, 1000)

            return () => clearInterval(intervalo) // Limpiamos al salir
        }
    }, [horaInicio])

    return (
        <>
            <header>
                <h1>Entrenamiento rápido</h1>
            </header>
            <section className="EntrenamientoRapido__datos">
                <div className="Datos_container">
                    <div className="Datos">
                        {modoEdicion ? ( // si el modo de edición está activo, solo muestra la duración del entrenamiento y no el timer. muy complicado si no
                            <>
                                <p>Duración</p>
                                <p className="Datos__valor">
                                    {duracion} {duracion === 1 ? 'minuto' : 'minutos'}
                                </p>
                            </>
                        ) : (
                            <>
                                <p>Tiempo</p>
                                <p className="Datos__valor">
                                    {Math.floor(tiempoActual / 3600000)}h {Math.floor((tiempoActual % 3600000) / 60000)}m {Math.floor((tiempoActual % 60000) / 1000)}s
                                </p>
                            </>
                        )}
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
                <NavLink to="/selector-ejercicios"> {/* cambiar a navigate ? */}
                    <button>
                        + Añade un ejercicio
                    </button>
                </NavLink>
                <button className='Boton__final' onClick={guardarEntrenamiento}>
                    {modoEdicion ? '✓ Guardar cambios' : '✓ Terminar entrenamiento'} {/* el texto cambia dependiendo de si es PUT o POST */}
                </button>
            </div>
        </>
    )
}
