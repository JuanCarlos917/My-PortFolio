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

	const menuItemsMax = [
		{ label: 'Contáctame 🤙', path: '/contact' },
		{ label: 'Inicio', path: '/home' },
		{ label: 'Mi Historia', path: '/about' },
		{ label: 'Ruta Profesional', path: '/cv' },
		{ label: 'Mi educación', path: '/education' },
		{ label: 'Mis Obras', path: '/projects' },
		{ label: 'Reviews', path: '/reviews' },
		{ label: 'Admin', path: '/dashboard' },
	];

	let content;

	if (status === 'loading' || status === 'idle') {
		content = (
			<div className='flex justify-center items-center h-screen'>
				<Loading />
			</div>
		);
	} else if (status === 'succeeded') {
		content = (
			<div className='bg-colorp font-sf text-Midnight_Blue mx-auto p-6 shadow-top'>
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
							{menuItemsMax.map((item, index) => (
								<div key={index}>
									<Link
										to={item.path}
										className={`w-full transition duration-300 font-sf ${
											item.label === 'Contáctame 🤙'
												? 'hover:text-soft_green'
												: item.label === 'Admin'
												? 'hover:text-bright_red'
												: 'hover:text-colorp2'
										}`}>
										{item.label}
									</Link>
								</div>
							))}
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
									className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 object-cover bg-darck_black'
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
