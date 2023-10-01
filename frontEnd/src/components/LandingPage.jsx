import { SocialLinks } from './SocialLinks';
import logo from '../assets/images/logoDark.svg';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';


export const LandingPage = () => {

	return (
		<div className='flex flex-col sm:flex-row h-screen gradient-bg text-gray-900'>
			{/* Lado izquierdo: Texto */}
			<div className='flex flex-col justify-center p-8 space-y-8 w-full sm:w-1/2'>
				<h1 className='text-3xl ont-aboreto'>
					Desarrollador Full-stack con Especialidad en Administración
					de Empresas
				</h1>
				<p className='text-lg leading-relaxed font-ysabeau'>
					Experto en tecnologías web como Javascript, React, Node.js,
					bases de datos PostgreSQL y despliegue en la nube con AWS.
				</p>
				<Link to='/contact'>
					<Button
						className='text-lg font-ysabeau text-Dark_Navy_Blue  hover:text-pale_blue transition duration-300'
						color='warning'
						variant='shadow'
						auto>
						Contactame
					</Button>
				</Link>
				<div className='flex space-x-4'>
                <SocialLinks/>
				</div>
			</div>
			{/* Lado derecho: Imagen con fondo negro */}
			<div className='flex items-center justify-center w-full sm:w-1/2'>
				<Link to='/'>
					<img
						src={logo}
						alt='logo'
						className='w-full max-h-[70%] sm:max-h-[90%] object-cover shadow-lg rounded'
					/>
				</Link>
			</div>
		</div>
	);
};
