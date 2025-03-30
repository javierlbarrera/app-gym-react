import { ListaEntrenamientos } from '../components/ListaEntrenamientos'
import { Inicio } from '../components/Inicio'
import './Menu.css'


export const Menu = () => {

    return (
        <>
            <header>
                <h1>Tus entrenamientos</h1>
            </header>
            <Inicio />
            <ListaEntrenamientos />
        </>
    )
}