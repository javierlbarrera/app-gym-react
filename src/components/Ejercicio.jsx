import React, { useContext, useState } from 'react'
import { EntrenamientoContexto } from '../context/EntrenamientoContexto'
import './Ejercicio.css'

export const Ejercicio = (props) => {

    const {_id, nombre, editando : editandoPorDefecto, series: serieInicial } = props //Le cambiamos el nombre a series para que no haya confusión con el state de series
    const [series, setSeries] = useState(serieInicial)
    const [editando, setEditando] = useState(editandoPorDefecto) //un state para poder "bloquear" el ejercicio. Coge el valor pasado desde el selector de ejercicio, un "editando : true". 
    const { actualizarEjercicio, eliminarEjercicio, actualizarSeries } = useContext(EntrenamientoContexto) //quiero meter en el contexto el estado de edición y las series también, para que se mantenga al cambiar de página.

    const handleChange = (index, field, value) => {  //una función para guardar en el state el valor de cada input. Recibimos de un onChange el número de la serie, el campo (peso o repeticiones) y el valor que se ha introducido en el input.
        // está hecho con ChatGPT, ya que no sabía cómo hacerlo
        if (!editando) return //si el ejercicio está "bloqueado", no se puede editar nada.
        const updated = [...series]
        updated[index][field] = value
        setSeries(updated)
        actualizarSeries(_id, updated) //actualiza el array de series en el contexto para que no se pierdan al cambiar de página.
    }

    const añadirSerie = () => { //añade un nuevo objeto al array de series, con el peso y repeticiones a 0. El map lo pinta en la tabla.
        const updated = [...series, { peso: '', repeticiones: '' }]
        setSeries(updated)
        actualizarSeries(_id, updated) //actualiza el array de series en el contexto para que no se pierdan al cambiar de página.
    }

    const quitarSerie = (index) => { //recibe el número de la serie a eliminar y hace un splice para quitarla del array de series. ChatGPT.
        if (!editando) return //no deja borrar series si el ejercicio está "bloqueado"
        const updated = [...series]
        updated.splice(index, 1)
        setSeries(updated)
        actualizarSeries(_id, updated) //actualiza el array de series en el contexto para que no se pierdan al cambiar de página.
    }

    const finalizarEjercicio = (_id) => { //función que llama a la función de actualizarEjercicio del contexto y le pasa el id del ejercicio y el nuevo estado (editando: false).
        setEditando(false) //cambia el estado de edición a false
        actualizarEjercicio(_id, { editando: false });
    }

    const reabrirEjercicio = (_id) => { //lo mismo pero para volver a poder editar el ejercicio
        setEditando(true)
        actualizarEjercicio(_id, { editando: true });
    }

    return (
        <div className='ListaEjercicios__Ejercicio'>
            <h3 className={`EjercicioTitulo ${editando ? '' : 'bloqueado'}`}>{nombre}</h3>
            <button className='Boton__cerrar' onClick={()=>eliminarEjercicio(_id)}>✖</button>
            <table className={`TablaSeries ${editando ? '' : 'bloqueado'}`}>
                <thead className='TablaSeries__cabecera'>
                    <tr><th>Serie</th><th>KG</th><th>Repeticiones</th><th></th></tr>
                </thead>
                <tbody>
                    {series.map((serie, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <input
                                    type="number"
                                    value={serie.peso}
                                    disabled={!editando} //bloquea el input si el ejercicio está "bloqueado"
                                    onChange={(e) => handleChange(index, 'peso', parseInt(e.target.value))} //Si hay un cambio, se manda el valor al state. 
                                />
                            </td>
                            <td>
                                <input 
                                    type="number"
                                    value={serie.repeticiones}
                                    disabled={!editando} //bloquea el input si el ejercicio está "bloqueado"
                                    onChange={(e) => handleChange(index, 'repeticiones', parseInt(e.target.value))}
                                />
                            </td>
                            <td>
                                <button className='Boton__quitarSerie' onClick={() => quitarSerie(index)} disabled={!editando}>✖</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editando ? ( //muestra los botones para añadir serie y terminar ejercicio si el ejercicio se puede editar. Si no, muestra el botón de editar.
                <>  
                    <button onClick={añadirSerie}>+ Añade una serie</button>
                    <button className='Boton__finalizar' onClick={() => finalizarEjercicio(_id)}>✓ Terminar ejercicio</button>
                </>
            ) : (
                <button onClick={() => reabrirEjercicio(_id)}>✏️ Editar</button>
            )}
        </div>
    )
}