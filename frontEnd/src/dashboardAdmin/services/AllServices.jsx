import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../features/services/servicesSlice';
import { Link } from 'react-router-dom';

export const AllServices = () => {
	const dispatch = useDispatch();
	const servicesInfo = useSelector((state) => state.services.servicesInfo);
	const status = useSelector((state) => state.services.status);
	const error = useSelector((state) => state.services.error);

	useEffect(() => {
		dispatch(getServices());
	}, [dispatch]);

	let content;
	if (status === 'loading') {
		content = (
			<div className='text-center font-semibold text-xl'>Loading...</div>
		);
	} else if (status === 'succeeded') {
		if (servicesInfo && Array.isArray(servicesInfo)) {
			content = servicesInfo.map((service, index) => (
				<div key={index} className='p-4 border rounded mb-4'>
					<div className='grid grid-cols-2'>
						<h3 className='text-lg font-semibold'>Nombre:</h3>
						<p>{service.name}</p>
						<h3 className='text-lg font-semibold'>Descripción:</h3>
						<p>{service.description}</p>
						<h3 className='text-lg font-semibold'>Precio:</h3>
						<p>{service.price}</p>
					</div>
					<div className='flex space-x-4 mt-4'>
						<Link
							to={`/dashboard/update-service/${service.id}`}
							className='bg-blue-500 text-white py-2 px-4 rounded'>
							Modificar
						</Link>
						<Link
							to={`/dashboard/delete-service/${service.id}`}
							className='bg-red-500 text-white py-2 px-4 rounded'>
							Eliminar
						</Link>
					</div>
				</div>
			));
		}
	} else if (status === 'failed') {
		content = (
			<div className='text-red-500 font-semibold text-center text-xl'>
				{error}
			</div>
		);
	}
	return (
		<div className='max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			{content}
		</div>
	);
};
