import './Opciones.css'
import { useEffect } from 'react'
import { BsDownload } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";


export const Opciones = ({onOpcionesCerradas, onEliminar }) => { //no conseguía hacerlo funcionar hasta que puse el prop entre llaves

    useEffect(() => { //un useEffect para cerrar las opciones al pulsar la tecla escape. Añade un addeventListener a las opciones y lo elimina al cerrarlas
        const handleKeyDown = (e) => {
          if (e.key === "Escape") {
            onOpcionesCerradas();
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onOpcionesCerradas]);

    return(
        <div className="Fondo" onClick={onOpcionesCerradas}>
            <div className="Opciones" onClick={e => e.stopPropagation()}> {/* el onClick del div padre es para cerrar las opciones al hacer click fuera de ellas, y el del div hijo es para evitar que se cierre al hacer click dentro de las opciones. ChatGPT */}
            <h3>Opciones</h3>
            <button className="Opciones__boton">
                <BsPencilSquare style={{strokeWidth : 0.4}} /> Editar entrenamiento
            </button>
            <button className="Opciones__boton Peligro" onClick={onEliminar}>
                <BsXLg style={{strokeWidth : 0.8}} /> Eliminar entrenamiento
            </button>
            <button className="Boton__cerrar" onClick={onOpcionesCerradas}>
                <BsXLg size={20} />
            </button>
            </div>
       </div>
    )
}
