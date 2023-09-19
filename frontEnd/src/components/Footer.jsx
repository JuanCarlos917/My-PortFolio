import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logoFooter.svg';


export const Footer = () => {
	// Obtener información del CV desde el estado de Redux
	const cvInfo = useSelector((state) => state.cv.cvInfo);

	return (
		<div className='bg-white text-black container mx-auto p-6 shadow-top'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
				{/* Primera columna de información */}
				<div className='space-y-4'>
					{/* Nombre y apellido */}
					<h1 className='text-4xl font-semibold'>
						{`${cvInfo?.name || 'Juan Carlos'} ${
							cvInfo?.lastName || 'Gomez'
						}`}
					</h1>

					{/* Teléfono y correo electrónico */}
					<p className='text-lg'>+57 {cvInfo?.phone}</p>
					<p className='text-lg'>{cvInfo?.email}</p>
					<div className='flex space-x-4'>
						<a
							href={cvInfo?.social_media?.linkedin}
							className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
							LinkedIn
						</a>
						<a
							href={cvInfo?.social_media?.github}
							className='bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded'>
							GitHub
						</a>
					</div>
				</div>

				{/* Segunda columna: Botones de redes sociales */}
				<div className='space-y-4'>
					{/* Enlaces adicionales */}
					<div className='flex flex-col space-y-2'>
						<Link to='/' className='hover:underline'>
							Home
						</Link>
						<Link to='/about' className='hover:underline'>
							Acerca de mí
						</Link>
						<Link to='/cv' className='hover:underline'>
							CV
						</Link>
						<Link to='/education' className='hover:underline'>
							Educación
						</Link>
						<Link to='/educatio' className='hover:underline'>
							Proyectos
						</Link>
						<Link to='/dashboard' className='hover:underline'>
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
				<small>&copy;{new Date().getFullYear()} | by Juan Gómez</small>
			</div>
		</div>
	);
};
