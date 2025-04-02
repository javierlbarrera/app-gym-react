import './Entrenamiento.css'
import { BsChevronDown } from "react-icons/bs"
import { BsThreeDots } from "react-icons/bs"
import  Avatar from '../assets/Avatar.svg'
import Usuario from '../assets/Usuario.png'
import { useState } from 'react'
import { Opciones } from './Opciones.jsx'

export const Entrenamiento = () => {

    const [lista, setLista] = useState(true)
    const [opciones, setOpciones] = useState(false)

    const toggleLista = () => {
        setLista(!lista)
    }
    const abrirOpciones = () => {
        setOpciones(true)
    }
    const cerrarOpciones = () => { 
        setOpciones(false)
    }

    return(
    <>
        {opciones && 
            <Opciones onClose={cerrarOpciones} /> //pasamos la función de cerrar las opciones como prop, para poder cerrarlas desde el componente Opciones
        }
        <section className="Entrenamiento">
            <div className="Entrenamiento__header">
                <div className="Header__titulo">
                    <h3>Entrenamiento de brazo 💪🏻</h3>
                    <button className='Header__boton'>
                        <BsThreeDots size={18} onClick={abrirOpciones} />
                    </button>
                </div>
                <div className="Header__usuario">
                    <img className='Usuario__foto' src={Avatar} alt="Iniciales de usuario" />
                    <div className='Usuario__info'>
                        <p className='Usuario__info--nombre'>Javier López</p>
                        <p className='Usuario__info--fecha'>Hace 8 horas</p>
                    </div>
                </div>
                <div className="Header__datos">
                    <div className="Datos">
                        <p>Tiempo</p>
                        <p className='Datos__valor'>58 minutos</p>
                    </div>
                    <div className="Datos">
                        <p>Volumen</p>
                        <p className='Datos__valor'>3200 kg movidos </p>
                    </div>
                </div>
            </div>
            <hr style={{color : "#D9D9D9",   marginLeft: "-1rem", marginRight: "-1rem", width: "calc(100% + 2rem)"}} /> {/* Tenía el problema de cómo aplicar el padding a todos los items excepto a este hr. Sí, lo de poner márgenes negativos es una solución propuesta por ChatGPT */}
            <div className="Entrenamiento__lista">
                <div className="Lista__header">
                    <h4>Ejercicios</h4>
                    <button onClick={toggleLista} className='Header__boton'>
                        <BsChevronDown className={`Chevron ${!lista ? 'girado' : ''}`} />
                    </button>
                </div>
                {lista && <div className="Lista__ejercicios">
                    <Ejercicio />
                    <Ejercicio />
                    <Ejercicio /> {/* probablemente otro map aquí sí señor */}
                </div>}
            </div>
        </section>
    </>
    )
}

const Ejercicio = () => {   

    return(
        <div className="Ejercicio">
            <img src={Usuario} alt="Foto del usuario" />
            <p>1 serie de elevación lateral de mancuernas</p>
        </div>
    )
}