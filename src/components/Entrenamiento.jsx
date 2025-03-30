import './Entrenamiento.css'

export const Entrenamiento = () => {


    return(

        <section className="Entrenamiento">
            <div className="Entrenamiento__header">
                <div className="Header__titulo">
                    <h4>Entrenamiento de brazo 💪🏻</h4>
                    <img src="#" alt="boton de tres" />
                </div>
                <div className="Header__usuario">
                    <img className='Usuario__foto' src="#" alt="foto de perfil" />
                    <div className='Usuario__info'>
                        <p>Javier López</p>
                        <p>Hace 8 horas</p>
                    </div>
                </div>
                <div className="Header__datos">
                    <div className="Datos__tiempo">
                        <p><strong>Tiempo</strong></p>
                        <p>58 minutos</p>
                    </div>
                    <div className="Datos__volumen">
                        <p><strong>Volumen</strong></p>
                        <p>3200 kg movidos </p>
                    </div>
                </div>
            </div>
            <div className="Entrenamiento__lista">
                <div className="Lista__header">
                    <h4>Ejercicios</h4>
                    <img src="#" alt="boton de dropdown" />
                </div>
                <div className="Lista__ejercicios">
                    <Ejercicio />
                    <Ejercicio />
                    <Ejercicio /> {/* probablemente otro map aquí sí señor */}
                </div>
            </div>
        </section>
    )
}

const Ejercicio = () => {   

    return(
        <div className="Ejercicio">
            <img src="#" alt="foto de ejercicio" />
            <p>1 serie de elevación lateral de mancuernas</p>
        </div>
    )
}