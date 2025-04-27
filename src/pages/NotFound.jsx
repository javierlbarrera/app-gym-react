import { NavLink } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {

  return (
    <div className="NotFound">
      <h1>404</h1>
      <p>¡Vaya! La página que buscas no existe.</p>
      <NavLink to="/inicio">Volver al inicio</NavLink>
    </div>
  );
};