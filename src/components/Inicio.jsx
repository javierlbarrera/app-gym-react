import './Inicio.css'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { EntrenamientoContexto } from '../context/EntrenamientoContexto.jsx'
import { useNavigate } from 'react-router-dom'

export const Inicio = () => {

    return (
        <>
            <BotonEntrenamiento />
            <hr style={{ color: "#D9D9D9" }} />
        </>
    )
}

const BotonEntrenamiento = () => {

    const {setHoraInicio} = useContext(EntrenamientoContexto)// Aquí estoy usando el contexto para importar el state de la hora de inicio
    const navigate = useNavigate()

    const iniciarEntrenamiento = () => { //Al iniciar el entrenamiento se guarda la hora de inicio en el contexto y se navega a la página de entrenamiento rápido
        setHoraInicio(Date.now())
        navigate("/entrenamiento-rapido");
    }

    return (
        <section className="Inicio">
            <h3>Inicio</h3>
            <button onClick={iniciarEntrenamiento}>+ Empezar entrenamiento rápido</button>
        </section>
    )
}

/* const BotonEntrenamientoGuardado = () => {

    return (
        <section className="Inicio">
            <h3>Entrenamientos guardados</h3>
            <button>
                + Empezar entrenamiento guardado
            </button>
        </section>
    )
} */