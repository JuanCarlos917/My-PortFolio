import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import FormValidationsAbout from '../../utils/FormValidationsAbout';
import { getAbout, updateAbout } from '../../features/about/aboutSlice';
import {
	saveToLocalStorage,
	removeFromLocalStorage,
} from '../localStorageHelpers/localStorageHelpers';

export const UpdateAbout = () => {
	const dispatch = useDispatch();

	const [showForm, setShowForm] = useState(true);
	const [cancelledModification, setCancelledModification] = useState(false);

	const aboutInfo = useSelector((state) => state.about.aboutInfo);
	const id = useSelector((state) => state.about.id);
	const status = useSelector((state) => state.about.status);
	const error = useSelector((state) => state.about.error);
	const modified = useSelector((state) => state.about.modified);

	useEffect(() => {
		if (!aboutInfo) {
			dispatch(getAbout());
		}
	}, [dispatch, aboutInfo]);

	useEffect(() => {
		if (modified) {
			removeFromLocalStorage('aboutInfoUpdate');
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

					{!aboutInfo ? (
						<div>
							<p>
								No existe información de acerca de mí, para
								modificar.
							</p>
							<Link to='/dashboard/form-about'>Crear</Link>
						</div>
					) : (
						<Formik
							initialValues={{
								bio: aboutInfo?.bio || '',
								skills: {
									frontend: aboutInfo?.skills?.frontend || '',
									backend: aboutInfo?.skills?.backend || '',
									database: aboutInfo?.skills?.database || '',
								},
							}}
							validationSchema={FormValidationsAbout}
							onSubmit={(values) => {
								const { bio, skills } = values;
								const transformedSkills = {
									frontend: skills.frontend
										.split(',')
										.map((skill) => skill.trim()),
									backend: skills.backend
										.split(',')
										.map((skill) => skill.trim()),
									database: skills.database
										.split(',')
										.map((skill) => skill.trim()),
								};

								// Pide confirmación al usuario
								const userConfirmed = window.confirm(
									'¿Estás seguro de que deseas realizar la modificación?',
								);

								// Si el usuario confirma, envía los cambios y elimina los datos del localStorage
								if (userConfirmed) {
									dispatch(
										updateAbout({
											id: id,
											aboutInfo: {
												bio,
												skills: transformedSkills,
											},
										}),
									);
								} else {
									setCancelledModification(true); // Establecer el estado si se cancela la modificación
									saveToLocalStorage('aboutInfoUpdate', {
										bio,
										skills: transformedSkills,
									});
								}
							}}>
							{() => (
								<Form className='space-y-4'>
									<div>
										<label
											htmlFor='bio'
											className='block text-sm font-medium text-gray-600'>
											Biografía
										</label>
										<Field
											as='textarea'
											name='bio'
											className='mt-1 p-2 w-full border rounded-md min-h-[9rem]'
										/>
										<ErrorMessage
											name='bio'
											component='div'
											className='text-red-500 text-sm'
										/>
									</div>

									<div>
										<label
											htmlFor='skills.frontend'
											className='block text-sm font-medium text-gray-600'>
											Frontend
										</label>
										<Field
											type='text'
											name='skills.frontend'
											className='mt-1 p-2 w-full border rounded-md'
											placeholder='habilidad1, habilidad2, habilidad3'
										/>
										<ErrorMessage
											name='skills.frontend'
											component='div'
											className='text-red-500 text-sm'
										/>
									</div>

									<div>
										<label
											htmlFor='skills.backend'
											className='block text-sm font-medium text-gray-600'>
											Backend
										</label>
										<Field
											type='text'
											name='skills.backend'
											className='mt-1 p-2 w-full border rounded-md'
											placeholder='habilidad1, habilidad2, habilidad3'
										/>
										<ErrorMessage
											name='skills.backend'
											component='div'
											className='text-red-500 text-sm'
										/>
									</div>

									<div>
										<label
											htmlFor='skills.database'
											className='block text-sm font-medium text-gray-600'>
											Base de Datos
										</label>
										<Field
											type='text'
											name='skills.database'
											className='mt-1 p-2 w-full border rounded-md'
											placeholder='habilidad1, habilidad2, habilidad3'
										/>
										<ErrorMessage
											name='skills.database'
											component='div'
											className='text-red-500 text-sm'
										/>
									</div>

									<div className='text-center'>
										<button
											type='submit'
											className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
											modificar
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
