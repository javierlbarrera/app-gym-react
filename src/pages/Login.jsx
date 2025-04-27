import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export const Login = () => {

    const {VITE_EXPRESS_URL} = import.meta.env
    const loginRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = loginRef.current
        const correo = form.elements.correo.value
        const contrasena = form.elements.contrasena.value

        try {
            const response = await fetch(`${VITE_EXPRESS_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, contrasena })
            })

            if (response.ok) {
                navigate('/inicio')
            } else {
                alert('Credenciales incorrectas')
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error)
            alert('Error de servidor')
        }
    }

    return (
        <div className="FormularioLogin">
            <div className="FormularioLogin__contenido">
                <h2>Inicia sesión para empezar a entrenar</h2>
                <form ref={loginRef} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo electrónico"
                        required
                    />
                    <input
                        type="password"
                        name="contrasena"
                        placeholder="Contraseña"
                        required
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>

    )
}