import './Opciones.css'
import { useEffect } from 'react'
import { BsDownload } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";



export const Opciones = ({onClose}) => { //no conseguía hacerlo funcionar hasta que puse el prop entre llaves

    useEffect(() => { //un useEffect para cerrar las opciones al pulsar la tecla escape. Añade un addeventListener a las opciones y lo elimina al cerrarlas
        const handleKeyDown = (e) => {
          if (e.key === "Escape") {
            onClose();
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return(
        <div className="Fondo" onClick={onClose}>
            <div className="Opciones" onClick={e => e.stopPropagation()}> {/* el onClick del div padre es para cerrar las opciones al hacer click fuera de ellas, y el del div hijo es para evitar que se cierre al hacer click dentro de las opciones. ChatGPT */}
            <h3>Opciones</h3>
            <button className="Opciones-boton">
                <BsPencilSquare style={{strokeWidth : 0.4}} /> Editar entrenamiento
            </button>
            <button className="Opciones-boton">
                <BsDownload style={{strokeWidth : 0.8}} /> Guardar entrenamiento
            </button>
            <button className="Opciones-boton Peligro">
                <BsXLg style={{strokeWidth : 0.8}} /> Eliminar entrenamiento
            </button>
            <button className="Boton-cerrar" onClick={onClose}>
                <BsXLg size={20} />
            </button>
            </div>
       </div>
    )
}
