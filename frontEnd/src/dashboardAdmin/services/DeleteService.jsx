import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getServices,
	deleteServices,
} from '../../features/services/servicesSlice';

export const DeleteService = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const servicesInfo = useSelector((state) => state.services?.servicesInfo);
	const specificService = Array.isArray(servicesInfo)
		? servicesInfo.find((serv) => serv.id.toString() === id)
		: null;

	const status = useSelector((state) => state.services.status);
	const error = useSelector((state) => state.services.error);
	const modified = useSelector((state) => state.services.modified);

	useEffect(() => {
		if (!servicesInfo) {
			dispatch(getServices());
		}
	}, [dispatch, servicesInfo]);

	return (
		<div className='container mx-auto p-4'>
			{modified ? (
				<div className='text-green-500 font-semibold text-center text-xl'>
					¡Eliminación realizada con éxito!
				</div>
			) : (
				<>
					{status === 'loading' && (
						<div className='text-center font-semibold text-xl'>
							Eliminando...
						</div>
					)}
					{status === 'failed' && (
						<div className='text-red-500 font-semibold text-center text-xl'>
							{error}
						</div>
					)}
					{!servicesInfo ? (
						<div className='text-center'>
							<p className='mb-4'>
								No existe información de servicios para
								eliminar.
							</p>
							<Link
								to='/dashboard/form-services'
								className='bg-green-500 text-white py-2 px-4 rounded'>
								Crear
							</Link>
						</div>
					) : (
						<div className='p-4 border rounded'>
							<div className='grid grid-cols-2'>
								<h4 className='text-lg font-semibold'>Titulo</h4>
								<p>{specificService.name}</p>
								<h4 className='text-lg font-semibold'> Descripción</h4>
								<p>{specificService.description}</p>
								<h4 className='text-lg font-semibold'>Precio</h4>
								<p>{specificService.price}</p>
                                <h4 className='text-lg font-semibold'>Imagen</h4>
                                <img
                                    className='w-1/2'
                                    src={specificService.imageUrl}
                                    alt={specificService.name}
                                />
							</div>
							<button
								onClick={() => dispatch(deleteServices(id))}
								className='bg-red-500 text-white py-2 px-4 rounded'>
								Eliminar
							</button>
							<Link
								to={`/dashboard/update-service/${id}`}
								className='bg-green-500 text-white py-2 px-4 rounded'>
								Modificar
							</Link>
						</div>
					)}
				</>
			)}
		</div>
	);
};
