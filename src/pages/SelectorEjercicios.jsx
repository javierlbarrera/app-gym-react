import './SelectorEjercicios.css'
import { useState, useEffect, useContext } from 'react'
import {EntrenamientoContexto} from '../context/EntrenamientoContexto'
import { useNavigate } from 'react-router-dom'

export const SelectorEjercicios = () => {

    const [listaEjercicios, setListaEjercicios] = useState([]) //state para guardar los ejercicios que vienen de la API y poder filtralos dinámicamente
    const [terminoBusqueda, setTerminoBusqueda] = useState('') //state para guardar el valor del input de la búsqueda (como en clase :) )
    const [grupoMuscular, setGrupoMuscular] = useState('') //state para guardar el valor del select de grupo muscular 
    const { añadirEjercicio } = useContext(EntrenamientoContexto)
    const navigate = useNavigate()

    const recibirEjercicios = async () => {
        const response = await fetch('http://localhost:3000/ejercicios')
        const datos = await response.json()
        setListaEjercicios(datos)
        console.log(datos) 
    }

    const inputChange = (e) => {
        setTerminoBusqueda(e.target.value.toLowerCase()) // aquí también lo convierto a minúsculas por si acaso
    }

    const selectChange = (e) => {
        setGrupoMuscular(e.target.value.toLowerCase())
    }

    const handleClick = ({_id, nombre}) => { // Con esta función añado el ejercicio al state de entrenamiento (en el contexto) y redirijo a la página de entrenamiento
        añadirEjercicio({
            id : _id, 
            nombre : nombre, 
            series : [{peso : 0, repeticiones : 0}]
        })
        navigate('/entrenamiento-rapido') 
    }

    useEffect(() => {
        recibirEjercicios()
    }, [])   

    return (
        <section className="Selector__container">
            <h1>Añade un ejercicio</h1>
            <form action="" id='Búsqueda y filtro'>
                <input type="text" placeholder="Buscar ejercicio" className="Selector__busqueda" value={terminoBusqueda} onChange={inputChange} />

                <select className="Selector__dropdown" value={grupoMuscular} onChange={selectChange}>
                    <option value="">Grupo muscular</option>
                    <option value="pecho">Pecho</option>
                    <option value="pierna">Pierna</option>
                    <option value="espalda">Espalda</option>
                    <option value="brazo">Brazo</option>
                    <option value="hombro">Hombro</option>
                    <option value="core">Core</option>
                </select>
            </form>

            <hr className='Selector__separador' />

            <ul className="Selector__lista">

                { listaEjercicios.length === 0 ? (
                    <li className="Ejercicio__item">
                        <p>No hay ejercicios disponibles</p>
                    </li>
                ) : (
                    // Aquí filtro los ejercicios por el nombre que contiene el input de la búsqueda. Los ejercicios ya están guardados en el state así que no se hacen varias llamadas a la API
                    listaEjercicios 
                    .filter((eachEjercicio) => eachEjercicio.nombre.toLowerCase().includes(terminoBusqueda))
                    .filter((eachEjercicio) => eachEjercicio.grupoMuscular.toLowerCase().includes(grupoMuscular)) // Aquí filtro por el grupo muscular que selecciono en el select
                    .map((eachEjercicio) => (
                        <li className="Ejercicio__item" key={eachEjercicio._id}>
                            <button className='Ejercicio__boton' onClick={()=>handleClick(eachEjercicio._id, eachEjercicio.nombre)} >{eachEjercicio.nombre}</button>
                        </li>
                    ))
                )
                }
            </ul>
        </section>
    )
}