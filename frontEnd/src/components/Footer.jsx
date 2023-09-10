// Importaciones
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Componente Footer
export const Footer = () => {
	// Obtener información del CV desde el estado de Redux
	const cvInfo = useSelector((state) => state.cv.cvInfo);

	return (
		<div className='bg-gray-800 text-white container mx-auto p-6'>
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
					<p className='text-lg'>{cvInfo?.phone}</p>
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
						<Link to='/dashboard' className='hover:underline'>
							Admin
						</Link>
					</div>
				</div>

				{/* Tercera columna: foto */}
				<div className='space-y-4'>
					{/* Imagen de perfil */}
					<img
						src='https://s3mediapf.s3.us-east-1.amazonaws.com/Captura%20de%20pantalla%202023-06-21%20a%20la%28s%29%2020.42.11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAXLCS7UOKL45CJ3TG%2F20230910%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230910T211028Z&X-Amz-Expires=3600&X-Amz-Signature=5eec57b9996880b596370b95bb20c029ff05ddbfef006a34de501117b709158a&X-Amz-SignedHeaders=host&x-id=GetObject'
						alt='Perfil'
						className='w-full max-w-xs rounded-full shadow-lg'
					/>
				</div>
			</div>
			{/* Footer Bottom */}
			<div className='w-full text-center mt-8'>
				<small>
					&copy;{new Date().getFullYear()} | Todos los derechos
					reservados.
				</small>
			</div>
		</div>
	);
};
