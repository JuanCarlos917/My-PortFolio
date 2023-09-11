import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormValidationsCV from '../../utils/FormValidationsCV';
import { Link } from 'react-router-dom';
import { getCV, updateCV } from '../../features/cv/cvSlice';
import {
	saveToLocalStorage,
	removeFromLocalStorage,
} from '../localStorageHelpers/localStorageHelpers';

export const UpdateCV = () => {
	const dispatch = useDispatch();

	const [showForm, setShowForm] = useState(true);
	const [cancelledModification, setCancelledModification] = useState(false);

	const cvInfo = useSelector((state) => state.cv.cvInfo);
	const id = useSelector((state) => state.cv.id);
	const status = useSelector((state) => state.cv.status);
	const error = useSelector((state) => state.cv.error);
	const modified = useSelector((state) => state.cv.modified);

	useEffect(() => {
		if (!cvInfo) {
			dispatch(getCV());
		}
	}, [dispatch, cvInfo]);

	useEffect(() => {
		if (modified) {
			removeFromLocalStorage('contactInfoUpdate');
			setShowForm(false); // Esconde el formulario después de una actualización exitosa
		}
	}, [modified]);

	return (
		<div className='max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			{modified && showForm === false ? (
				<div className='text-center mb-4'>
					¡Modificación realizada con éxito!
					<button onClick={() => setShowForm(true)}>Modificar</button>
				</div>
			) : cancelledModification ? ( // Comprobar si la modificación fue cancelada
				<div className='text-center mb-4'>
					¡No se modificó nada!
					<button
						onClick={() => {
							setShowForm(true);
							setCancelledModification(false); // Resetear el estado al intentar de nuevo
						}}>
						Modificar de nuevo
					</button>
				</div>
			) : (
				<>
					{status === 'loading' && (
						<div className='text-yellow-500'>Actualizando...</div>
					)}
					{status === 'failed' && (
						<div className='text-red-500'>{error}</div>
					)}
					{!cvInfo ? (
						<div>
							<p>No existe información de CV, para modificar.</p>
							<Link to='/dashboard/form-cv'>Crear</Link>
						</div>
					) : (
						<Formik
							initialValues={{
								name: cvInfo?.name || '',
								lastName: cvInfo?.lastName || '',
								email: cvInfo?.email || '',
								phone: cvInfo?.phone || '',
								social_media: {
									linkedin:
										cvInfo?.social_media?.linkedin || '',
									github: cvInfo?.social_media?.github || '',
								},
								imageUrl: cvInfo?.imageUrl || ''
							}}
							validationSchema={FormValidationsCV}
							onSubmit={(values) => {
								const {
									name,
									lastName,
									email,
									phone,
									social_media,
                                    imageUrl
								} = values;

								const cvInfo = {
									name,
									lastName,
									email,
									phone,
									social_media,
                                    imageUrl
								};
								const userConfirmed = window.confirm(
									'¿Estás seguro de que deseas realizar la modificación?',
								);
								if (userConfirmed) {
									dispatch(
										updateCV({
											id: id,
											cvInfo,
										}),
									);
								} else {
									setCancelledModification(true);
									saveToLocalStorage('contactInfoUpdate', {
										cvInfo,
									});
								}
							}}>
							{() => (
								<Form className='space-y-4'>
									<label
										htmlFor='name'
										className='block text-sm font-medium text-gray-600'>
										Nombre
									</label>
									<Field
										type='text'
										name='name'
										className='mt-1 p-2 w-full border rounded-md'
									/>
									<ErrorMessage
										name='name'
										component='div'
										className='text-red-500 text-sm'
									/>
									<label
										htmlFor='lastName'
										className='block text-sm font-medium text-gray-600'>
										Apellido
									</label>
									<Field
										type='text'
										name='lastName'
										className='mt-1 p-2 w-full border rounded-md'
									/>
									<ErrorMessage
										name='lastName'
										component='div'
										className='text-red-500 text-sm'
									/>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-gray-600'>
										Email
									</label>
									<Field
										type='email'
										name='email'
										className='mt-1 p-2 w-full border rounded-md'
									/>
									<ErrorMessage
										name='email'
										component='div'
										className='text-red-500 text-sm'
									/>
									<label
										htmlFor='phone'
										className='block text-sm font-medium text-gray-600'>
										Teléfono
									</label>
									<Field
										type='text'
										name='phone'
										className='mt-1 p-2 w-full border rounded-md'
									/>
									<ErrorMessage
										name='phone'
										component='div'
										className='text-red-500 text-sm'
									/>
									{/* Social media */}
									<label
										htmlFor='social_media.linkedin'
										className='block text-sm font-medium text-gray-600'>
										Linkedin
									</label>
									<Field
										type='text'
										name='social_media.linkedin'
										className='mt-1 p-2 w-full border rounded-md'
									/>
									<ErrorMessage
										name='social_media.linkedin'
										component='div'
										className='text-red-500 text-sm'
									/>
									<label
										htmlFor='social_media.github'
										className='block text-sm font-medium text-gray-600'>
										Github
									</label>
									<Field
										type='text'
										name='social_media.github'
										className='mt-1 p-2 w-full border rounded-md'
									/>
									<ErrorMessage
										name='social_media.github'
										component='div'
										className='text-red-500 text-sm'
									/>
                                    <label
                                        htmlFor='imageUrl'
                                        className='block text-sm font-medium text-gray-600'>
                                        Imagen
                                        </label>
                                    <Field
                                        type='text'
                                        name='imageUrl'
                                        className='mt-1 p-2 w-full border rounded-md'
                                    />
									<div className='text-center'>
										<button
											type='submit'
											className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
											Modificar
										</button>
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
