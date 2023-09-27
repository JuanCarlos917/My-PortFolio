import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logoFooter.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';


export const Footer = () => {
	// Obtener información del CV desde el estado de Redux
	const cvInfo = useSelector((state) => state.cv.cvInfo);

	return (
		<div className='bg-white_bg font-sf text-black container mx-auto p-6 shadow-top'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
				{/* Primera columna de información */}
				<div className='space-y-4'>
					{/* Nombre y apellido */}
					<h1 className='text-4xl font-sf'>
						{`${cvInfo?.name || 'Juan Carlos'} ${
							cvInfo?.lastName || 'Gómez'
						}`}
					</h1>

					{/* Teléfono */}
					<div className='flex items-center space-x-2'>
						<CallIcon color='disabled' />
						<p className='text-lg'>+57 {cvInfo?.phone}</p>
					</div>

					{/* Correo electrónico */}
					<div className='flex items-center space-x-2'>
						<EmailIcon color='disabled' />
						<p className='text-lg'>{cvInfo?.email}</p>
					</div>
				</div>

				{/* Segunda columna: Botones de redes sociales */}
				<div className='space-y-4'>
					{/* Enlaces adicionales */}
					<div className='flex flex-col space-y-2'>
						<Link
							to='/'
							className='hover:text-golden hover:underline transition duration-300'>
							Home
						</Link>
						<Link
							to='/about'
							className='hover:text-golden hover:underline transition duration-300'>
							Acerca de mí
						</Link>
						<Link
							to='/cv'
							className='hover:text-golden hover:underline transition duration-300'>
							CV
						</Link>
						<Link
							to='/education'
							className='hover:text-golden hover:underline transition duration-300'>
							Educación
						</Link>
						<Link
							to='/projects'
							className='hover:text-golden hover:underline transition duration-300'>
							Proyectos
						</Link>
						<Link
							to='/dashboard'
							className='hover:text-bright_red hover:underline transition duration-300'>
							Admin
						</Link>
					</div>
				</div>

				{/* Tercera columna: foto */}
				<div className='space-y-4'>
					{/* Imagen de perfil */}
					<span className='inline-block w-40 h-40 relative overflow-hidden'>
						<Link to='/'>
							<img
								src={logo}
								alt='logo'
								className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 object-cover'
							/>
						</Link>
					</span>
				</div>
			</div>
			{/* Footer Bottom */}
			<div className='w-full text-center mt-8'>
				<div className='flex-center pb-2'>
					<a href={cvInfo?.social_media?.linkedin}>
						<LinkedInIcon
							className='hover:text-golden transition duration-300'
							color='disabled'
						/>
					</a>
					<a href={cvInfo?.social_media?.github}>
						<GitHub
							className='hover:text-golden transition duration-300'
							color='disabled'
						/>
					</a>
				</div>
				<small>&copy;{new Date().getFullYear()} | by Juan Gómez </small>
			</div>
		</div>
	);
};
