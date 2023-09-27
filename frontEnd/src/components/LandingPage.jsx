import { useSelector } from 'react-redux';
import logo from '../assets/images/logoClear.svg';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Linkedin from '@mui/icons-material/Linkedin';
import GitHub from '@mui/icons-material/GitHub';

export const LandingPage = () => {

	// Obtener información del CV desde el estado de Redux
	const cvInfo = useSelector((state) => state.cv.cvInfo);

	return (
		<div className='flex h-screen bg-gray-50 text-gray-900'>
			{/* Lado izquierdo: Texto */}
			<div className='flex flex-col justify-center w-1/2 p-16 space-y-8'>
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
					<a href={cvInfo?.social_media?.linkedin}>
						<Linkedin
							color='disabled'
							className='hover:text-linkedin transition duration-300'
						/>
					</a>
					<a href={cvInfo?.social_media?.github}>
						<GitHub
							color='disabled'
							className='hover:text-darck_black transition duration-300'
						/>
					</a>
				</div>
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
