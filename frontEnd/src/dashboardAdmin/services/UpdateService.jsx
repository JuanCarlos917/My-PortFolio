import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsService from '../../utils/FormValidationsService';

import {
	getServices,
	updateServices,
	resetModifiedState,
} from '../../features/services/servicesSlice';

import {
	saveToLocalStorage,
	removeFromLocalStorage,
} from '../localStorageHelpers/localStorageHelpers';

export const UpdateService = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [showForm, setShowForm] = useState(true);
	const [cancelledModification, setCancelledModification] = useState(false);

	// Obtén la lista completa de servicios
	const servicesInfo = useSelector((state) => state.services?.servicesInfo);
	// Busca el servicio específico basándote en el ID
	const specificService = Array.isArray(servicesInfo)
		? servicesInfo.find((serv) => serv.id.toString() === id)
		: null;

	const status = useSelector((state) => state.services.status);
	const error = useSelector((state) => state.services.error);
	const modified = useSelector((state) => state.services.modified);

	// Solicita siempre la información de servicios al cargar el componente
	useEffect(() => {
		dispatch(getServices());
	}, [dispatch]);

	useEffect(() => {
		if (modified) {
			removeFromLocalStorage('servicesInfoUpdate');
			setShowForm(false); // Esconde el formulario después de una actualización exitosa

			setTimeout(() => {
				dispatch(resetModifiedState());
			}, 3000);
		}
	}, [modified, dispatch]);

	return (
		<div className='max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			{modified && showForm === false ? (
				<div className='text-center mb-4'>
					¡Modificación realizada con éxito!
				</div>
			) : cancelledModification ? (
				<div className='text-center mb-4'>
					¡No se modificó nada!
					<button
						onClick={() => {
							setShowForm(true);
							setCancelledModification(false);
						}}
						className='text-blue-500 underline ml-1'>
						Editar
					</button>
				</div>
			) : (
				<>
					{status === 'failed' && (
						<div className='text-red-500'>{error}</div>
					)}
					{status === 'loading' && (
						<div className='text-yellow-500'>Actualizando...</div>
					)}

					{!specificService ? (
						<div className='text-red-500'>
							<p>No se encontró el servicio para modificar.</p>
							<Link to='/dashboard/form-services'>Crear</Link>
						</div>
					) : (
						<Formik
							initialValues={{
								name: specificService.name,
								description: specificService.description,
								price: specificService.price,
								imageUrl: specificService.imageUrl,
							}}
							validationSchema={FormValidationsService}
							onSubmit={(values) => {
								// Pide confirmación al usuario
								const userConfirmed = window.confirm(
									'¿Estás seguro de que deseas realizar la modificación?',
								);
								if (userConfirmed) {
									//encodeURI elimina los espacios y los reemplaza con %
									const encodedImageUrl = encodeURI(
										values.imageUrl,
									);
									dispatch(
										updateServices({
											id: id,
											servicesInfo: {
												name: values.name,
												description: values.description,
												price: values.price,
												imageUrl: encodedImageUrl,
											},
										}),
									);
								} else {
									setCancelledModification(true);
									// Si el usuario no confirma, vuelve a mostrar los datos del servicio anteriormente guardado en state
									saveToLocalStorage('servicesInfoUpdate', {
										servicesInfo: {
											name: values.name,
											description: values.description,
											price: values.price,
											image: values.imageUrl,
										},
									});
								}
							}}>
							{() => (
								<Form>
									<label htmlFor='name'>Título</label>
									<Field
										type='text'
										name='name'
										placeholder='Título'
									/>
									<ErrorMessage name='name' component='div' />

									<label htmlFor='description'>
										Descripción
									</label>
									<Field
										type='text'
										name='description'
										placeholder='Descripción'
									/>
									<ErrorMessage
										name='description'
										component='div'
									/>

									<label htmlFor='imageUrl'>
										URL de la imagen
									</label>
									<Field
										type='text'
										name='imageUrl'
										placeholder='URL de la imagen'
									/>
									<ErrorMessage
										name='imageUrl'
										component='div'
									/>

									<label htmlFor='price'>Precio</label>
									<Field
										type='number'
										name='price'
										placeholder='Precio'
									/>
									<ErrorMessage
										name='price'
										component='div'
									/>
									<button type='submit'>Modificar</button>
								</Form>
							)}
						</Formik>
					)}
				</>
			)}
		</div>
	);
};
