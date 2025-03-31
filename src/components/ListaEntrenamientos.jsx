import { Entrenamiento } from "./Entrenamiento";
import './ListaEntrenamientos.css';

export const ListaEntrenamientos = () => {


    return (
        <section className="Lista-entrenamientos">  
            <h3 className="Lista-titulo">Últimos entrenamientos</h3>
            <Entrenamiento /> {/* Probablemente haya que hacer un map para conseguir todos los entrenamientos */}
        </section>
    )
}