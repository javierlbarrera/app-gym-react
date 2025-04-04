import './Inicio.css'


export const Inicio = () => {

    return (
        <>
            <EntrenamientoRapido/>
            <EntrenamientoGuardado/>
            <hr style={{color : "#D9D9D9"}} />
        </>
    )
    }

const EntrenamientoRapido = () => {

    return (
        <section className="Inicio">
            <h3>Inicio</h3>
            <button className="Inicio__button">
                + Empezar entrenamiento rápido
            </button>
    </section>
    )
}

const EntrenamientoGuardado = () => {  

    return (
        <section className="Inicio">
            <h3>Entrenamientos guardados</h3>
            <button className="Inicio__button">
                + Empezar entrenamiento guardado
            </button>
        </section>
    )
}