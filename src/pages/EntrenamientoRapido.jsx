import './EntrenamientoRapido.css'
import { NavLink } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { EntrenamientoContexto } from '../context/EntrenamientoContexto.jsx'

export const EntrenamientoRapido = () => {

    const { ejercicios } = useContext(EntrenamientoContexto) // Aquí estoy usando el contexto para importar el state

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
                        <p className='Datos__valor'>3200 kg movidos </p>
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
                        {ejercicios.map((ejercicio, index) => (
                            <div key={index}>
                                <p>{ejercicio.nombre}</p>
                                <table className='TablaSeries'>
                                    <thead>
                                        <tr><th>Serie</th><th>KG</th><th>Repeticiones</th></tr>
                                    </thead>
                                    <tbody>
                                        {ejercicio.series.map((s, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{s.peso}</td>
                                                <td>{s.repeticiones}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button>+ Añade una serie</button>
                            </div>
                        ))}
                    </>
                )}
            </section>


            <NavLink to="/selector-ejercicios">
                <button>
                    + Añade un ejercicio
                </button>
            </NavLink>
        </>
    )
}