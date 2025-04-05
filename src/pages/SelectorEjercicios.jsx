import './SelectorEjercicios.css'

const exercises = [
    { name: 'Press banca' },
    { name: 'Sentadillas' },
    { name: 'Dominadas' },
    { name: 'Curl bíceps' },
    { name: 'Press militar' },
    { name: 'Plancha' }
];

export const SelectorEjercicios = () => {

    return (
        <section className="Selector__container">
            <h1>Añade un ejercicio</h1>

            <input type="text" placeholder="Buscar ejercicio" className="Selector__busqueda" />

            <select className="Selector__dropdown">
                <option value="">Grupo muscular</option>
                <option value="pecho">Pecho</option>
                <option value="pierna">Pierna</option>
                <option value="espalda">Espalda</option>
                <option value="brazo">Brazo</option>
                <option value="hombro">Hombro</option>
                <option value="core">Core</option>
            </select>

            <hr className='Selector__separador' />

            <ul className="Selector__lista">
                {exercises.map((exercise, index) => (
                    <li className="Ejercicio-item" key={index}>
                        <p>{exercise.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}