import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsStarRating from '../../utils/FormValidationsStarRating';

import {
	getStarRating,
	updateStarRating,
	resetModifiedState,
} from '../../features/starRating/starRatingSlice';

import {
	saveToLocalStorage,
	removeFromLocalStorage,
} from '../localStorageHelpers/localStorageHelpers';

export const UpdateStarRating = () => {
	const { id } = useParams();
	const dispatch = useDispatch();


	const [showForm, setShowForm] = useState(true);
	const [cancelledModification, setCancelledModification] = useState(false);

	// Obtén la lista completa de servicios
	const starRatingInfo = useSelector((state) => state.starRating?.starRating);
	// Busca el servicio específico basándote en el ID
	const specificStarRating = Array.isArray(starRatingInfo)
		? starRatingInfo.find((serv) => serv.id === id)
		: null;

	const status = useSelector((state) => state.starRating.status);
	const error = useSelector((state) => state.starRating.error);
	const modified = useSelector((state) => state.starRating.modified);

	useEffect(() => {
		dispatch(getStarRating());
	}, [dispatch]);
	//    console.log("UpdateStarRating", showForm )
	useEffect(() => {
		if (modified) {
			removeFromLocalStorage('starRatingInfoUpdate');
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
					¡Modificación cancelada!
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
					{!specificStarRating ? (
						<div className='text-red-500'>
							<p>No se encontró el ningun review</p>
							<Link to='/dashboard/all-star-rating'>
								ver todas
							</Link>
						</div>
					) : (
						<Formik
							initialValues={{
								starRating: specificStarRating.starRating,
								comment: specificStarRating.comment,
							}}
							validationSchema={FormValidationsStarRating}
							onSubmit={(values) => {
								// Pide confirmación al usuario
								const userConfirmed = window.confirm(
									'¿Estás seguro de que deseas realizar la modificación?',
								);
								if (userConfirmed) {
									dispatch(
										updateStarRating({
											id: id,
											starRatingInfo: {
												starRating: values.starRating,
												comment: values.comment,
											},
										}),
									);
								} else {
									setCancelledModification(true);
									// Si el usuario no confirma, vuelve a mostrar los datos del servicio anteriormente guardado en state
									saveToLocalStorage('starRatingInfoUpdate', {
										starRatingInfo: {
											starRating: values.starRating,
											comment: values.comment,
										},
									});
								}
							}}>
							{() => (
								<Form className='space-y-6'>
									<div>
										<label
											htmlFor='starRating'
											className='block text-sm font-medium text-gray-700'>
											Nombre
										</label>
										<div className='mt-1'>
											<Field
												id='starRating'
												name='starRating'
												type='text'
												autoComplete='name'
												className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
											/>
											<ErrorMessage
												name='starRating'
												component='div'
												className='field-error'
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor='comment'
											className='block text-sm font-medium text-gray-700'>
											comentario
										</label>
										<div className='mt-1'>
											<Field
												id='comment'
												name='comment'
												type='text'
												autoComplete='description'
												className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
											/>
											<ErrorMessage
												name='comment'
												component='div'
												className='field-error'
											/>
										</div>
									</div>
									<div className='flex justify-between'>
										<button
											type='submit'
											className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'>
											Modificar
										</button>
										<Link
											to='/dashboardAdmin/starRating'
											className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700'>
											Cancelar
										</Link>
									</div>
								</Form>
							)}
						</Formik>
					)}
				</>
			)}
		</div>
	);
};
