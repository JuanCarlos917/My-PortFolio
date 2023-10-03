import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCV } from '../features/cv/cvSlice';
import { Loading } from './Loading/Loading';
import logo from '../assets/images/logoClear.svg';
import { SocialLinks } from './SocialLinks';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

export const Footer = () => {

	const dispatch = useDispatch();
	const cvInfo = useSelector((state) => state.cv.cvInfo);
	const status = useSelector((state) => state.cv.status);
	const error = useSelector((state) => state.cv.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getCV());
		}
	}, [status, dispatch]);

	let content;

	if (status === 'loading' || status === 'idle') {
		content = (
			<div className='flex justify-center items-center h-screen'>
				<Loading />
			</div>
		);
	} else if (status === 'succeeded') {
		content = (
			<div className='bg-Dark_Navy_Blue font-sf text-white mx-auto p-6 shadow-top'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-20 space-x-4 md:space-x-0 items-start'>
					{/* Primera columna de información */}
					<div className='space-y-4 md:space-y-0'>
						{/* Nombre y apellido */}
						<h1 className='text-4xl font-sf'>
							{`${cvInfo?.name || 'Juan Carlos'} ${
								cvInfo?.lastName || 'Gómez'
							}`}
						</h1>

						{/* Teléfono */}
						<div className='flex items-center space-x-2'>
							<CallIcon color='primary' />
							<p className='text-lg'>+57 {cvInfo?.phone}</p>
						</div>

						{/* Correo electrónico */}
						<div className='flex items-center space-x-2'>
							<EmailIcon color='primary' />
							<p className='text-lg'>{cvInfo?.email}</p>
						</div>
					</div>

					{/* Segunda columna: Botones de redes sociales */}
					<div className='space-y-4'>
						{/* Enlaces adicionales */}
						<div className='flex flex-col space-y-2'>
							<Link
								to='/contact'
								className='hover:text-soft_green hover:underline transition duration-300'>
								Contactame
							</Link>
							<Link
								to='/home'
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
					<div className='space-y-4 md:space-y-0'>
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
				<div className='space-y-4 md:space-y-0 w-full text-center mt-8'>
					<div className='flex-center pb-2'>
						<SocialLinks />
					</div>
					<small>
						&copy;{new Date().getFullYear()} | by Juan Gómez{' '}
					</small>
				</div>
			</div>
		);
	} else if (status === 'failed') {
		content = <div className='text-red-500 font-semibold'>{error}</div>;
	}

	return (
		<div className='p-0 rounded-lg'>
			{' '}
			{/* Estilo de fondo y sombra */}
			{content}
		</div>
	);
};
