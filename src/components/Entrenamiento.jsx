import './Entrenamiento.css'
import { BsChevronDown } from "react-icons/bs"
import { BsThreeDots } from "react-icons/bs"
import Avatar from '../assets/Avatar.svg'
import EjercicioImagen from '../assets/EjercicioImagen.jpg'
import { useState } from 'react'

export const Entrenamiento = (props) => {

    const [lista, setLista] = useState(false) // state para mostrar u ocultar la lista de ejercicios. Inicialmente está oculta.

    const toggleLista = () => {
        setLista(!lista)
    }

    const { nombre, usuario, updatedAt, duracion, volumen, ejercicios, onOpcionesAbiertas } = props //desestructuro los props recibidos desde ListaEntrenamientos

    // desde Mongoose mando los timestamps, que usaré para calcular hace cuánto se ha creado el entrenamiento. los he recibido arriba.

    const tiempoDesde = (updatedAt) => { //la lógica de la función para cuándo mostrar "hace x min" o "hace x horas" la he hecho con ChatGPT.
        const updatedDate = new Date(updatedAt)
        const now = new Date()
        const diffMs = now - updatedDate
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMins / 60)
        const diffDays = Math.floor(diffHours / 24)
      
        if (diffMins < 1) return 'Justo ahora'
        if (diffMins < 60) return `Hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`
        if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`
        if (diffDays === 1) return 'Ayer'
        return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`
    }


    return (
        <>
            <section className="Entrenamiento">
                <div className="Entrenamiento__header">
                    <div className="Header__titulo">
                        <h3>{nombre}</h3>
                        <button className='Header__boton'>
                            <BsThreeDots size={18} onClick={onOpcionesAbiertas} />
                        </button>
                    </div>
                    <div className="Header__usuario">
                        <img className='Usuario__foto' src={Avatar} alt="Iniciales de usuario" />
                        <div className='Usuario__info'>
                            <p className='Usuario__info--nombre'>{usuario}</p>
                            <p className='Usuario__info--fecha'>{tiempoDesde(updatedAt)}</p>
                        </div>
                    </div>
                    <div className="Header__datos">
                        <div className="Datos">
                            <p>Duración</p>
                            <p className='Datos__valor'>
                                {duracion} {duracion === 1 ? 'minuto' : 'minutos'} {/* 1 minuto en singular, x minutos en plural */}
                            </p>
                        </div>
                        <div className="Datos">
                            <p>Volumen</p>
                            <p className='Datos__valor'>{volumen} kg movidos</p>
                        </div>
                    </div>
                </div>

                <hr style={{ color: "#D9D9D9", marginLeft: "-1rem", marginRight: "-1rem", width: "calc(100% + 2rem)" }} /> {/* Tenía el problema de cómo aplicar el padding a todos los items excepto a este hr. Sí, lo de poner márgenes negativos es una solución propuesta por ChatGPT */}

                <div className="Entrenamiento__lista">
                    <div className="Lista__header">
                        <h4>Ejercicios realizados</h4>
                        <button onClick={toggleLista} className='Header__boton'>
                            <BsChevronDown className={`Chevron ${!lista ? 'girado' : ''}`} /> {/* Condicional para aplicar un estilo distinto al indicador */}
                        </button>
                    </div>

                    {lista && (
                        <div className="Lista__ejercicios">
                            {ejercicios.map(eachEjercicio => {
                                return (
                                    <Ejercicio key={eachEjercicio._id} {...eachEjercicio} />
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

const Ejercicio = (props) => {
    const { nombre, series } = props //desestructuro los props para poder usarlos directamente

    return (
        <div className="Ejercicio">
            <img src={EjercicioImagen} alt="Foto del ejercicio" />
            <p> {series.length} {series.length === 1 ? 'serie' : 'series'} de {nombre.toLowerCase()} </p> {/* // 1 serie en singular, x serieS en plural. Los ejercicios están guardados con mayúscula inicial en la bd, de ahí el toLowerCase() */}
        </div>
    )
}