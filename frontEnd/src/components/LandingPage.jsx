import { SocialLinks } from './SocialLinks';
import logo from '../assets/images/logoDark.svg';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';


export const LandingPage = () => {

	return (
		<div className='flex flex-col sm:flex-row h-screen bg-Midnight_Blue'>
			{/* Lado izquierdo: Texto */}
			<div className='flex flex-col justify-center p-8 space-y-8 w-full sm:w-1/2'>
				<h1
					className='text-4xl font-kanit text-left text-Orange_Pumpkin
                '>
					Desarrollador Full-stack y Profesional en Administración de
					Empresas
				</h1>
				<p className='text-lg leading-relaxed font-sf text-white'>
					Cuento con habilidades en desarrollo frontend,
					backend, gestión de bases de datos y desplige en AWS
				</p>
				<Link to='/contact'>
					<Button
						className='text-lg font-sf text-Midnight_Blue hover:text-pale_blue transition duration-300 rocket-animation' // Agrega la clase rocket-animation aquí
						color='warning'
						variant='shadow'
						auto>
						Contáctame 🚀
					</Button>
				</Link>
				<div className='flex space-x-4'>
					<SocialLinks />
				</div>
			</div>
			{/* Lado derecho: Imagen con fondo negro */}
			<div className='flex items-center justify-center w-full sm:w-1/2 '>
				<Link to='/'>
					<img
						src={logo}
						alt='logo'
						className='w-full max-h-[70%] sm:max-h-[90%] object-cover shadow-lg rounded bg-white'
					/>
				</Link>
			</div>
		</div>
	);
};
