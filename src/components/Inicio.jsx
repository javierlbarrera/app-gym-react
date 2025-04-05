import './Inicio.css'
import { NavLink } from 'react-router-dom';

export const Inicio = () => {

    return (
        <>
            <BotonEntrenamiento/>
{/*             <BotonEntrenamientoGuardado/>
 */}            <hr style={{color : "#D9D9D9"}} />
        </>
    )
    }

const BotonEntrenamiento = () => {

    return (
        <section className="Inicio">
            <h3>Inicio</h3>
            <NavLink to="/entrenamiento-rapido">
                <button>+ Empezar entrenamiento rápido</button>
            </NavLink>
    </section>
    )
}

const BotonEntrenamientoGuardado = () => {  

    return (
        <section className="Inicio">
            <h3>Entrenamientos guardados</h3>
            <button>
                + Empezar entrenamiento guardado
            </button>
        </section>
    )
}