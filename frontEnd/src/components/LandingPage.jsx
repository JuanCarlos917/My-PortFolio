import logo from '../assets/images/logoClear.svg';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
	return (
		<div className='flex h-screen bg-gray-50 text-gray-900'>
			{/* Lado izquierdo: Texto */}
			<div className='flex flex-col justify-center w-1/2 p-16 space-y-8'>
				<h1 className='text-3xl font-semibold'>
					Desarrollador Full-stack con Especialidad en Administración
					de Empresas
				</h1>
				<p className='text-lg leading-relaxed'>
					Experto en tecnologías web como Javascript, React, Node.js,
					bases de datos PostgreSQL y despliegue en la nube con AWS.
				</p>
			</div>

			{/* Lado derecho: Imagen con fondo negro */}
			<div className='flex items-center justify-center w-1/2 bg-black'>
				<Link to='/'>
					<img
						src={logo}
						alt='logo'
						className='w-full max-h-[70%] object-cover shadow-lg rounded'
					/>
				</Link>
			</div>
		</div>
	);
};
