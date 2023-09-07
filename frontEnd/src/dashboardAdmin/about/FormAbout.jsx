import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createAbout, getAbout } from '../../features/about/aboutSlice';
import FormValidationsAbout from '../../utils/FormValidationsAbout';
import { Link } from 'react-router-dom';

export const FormAbout = () => {
	const dispatch = useDispatch();
	const aboutInfo = useSelector((state) => state.about.aboutInfo);
	const status = useSelector((state) => state.about.status);
	const error = useSelector((state) => state.about.error);

	useEffect(() => {
		if (!aboutInfo) {
			dispatch(getAbout());
		}
	}, [dispatch, aboutInfo]);

	const initialValues = {
		bio: '',
		skills: {
			frontend: '',
			backend: '',
			database: '',
		},
	};

	return (
		<div className='max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			{status === 'failed' && <div className='text-red-500'>{error}</div>}
			{aboutInfo ? (
				<div className='text-center mb-4'>
					<p className='text-lg'>
						Ya existe información acerca de mí. Por favor, modifique
						la que ya existe.
					</p>
					<Link
						to='/dashboard/update-about'
						className='text-blue-500 hover:underline'>
						Editar
					</Link>
				</div>
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={FormValidationsAbout}
					onSubmit={(values, { setSubmitting }) => {
						// Transformar y enviar los datos
						dispatch(createAbout(values));
						setSubmitting(false);
					}}>
					{({ isSubmitting }) => (
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
									disabled={isSubmitting}
									className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
									Enviar
								</button>
							</div>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
};
