import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCV, getCV } from '../../features/cv/cvSlice';
import FormValidationsCV from '../../utils/FormValidationsCV';

export const FormCV = () => {
	const dispatch = useDispatch();
	const cvInfo = useSelector((state) => state.cv.cvInfo);
	const status = useSelector((state) => state.cv.status);
	const error = useSelector((state) => state.cv.error);
	useEffect(() => {
		if (!cvInfo) {
			dispatch(getCV());
		}
	}, [dispatch, cvInfo]);
	const initialValues = {
		name: '',
		lastName: '',
		email: '',
		phone: '',
		social_media: {
			linkedin: '',
			github: '',
		},
        imageUrl: '',
	};
	return (
		<div className='max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			{status === 'failed' && <div className='text-red-500'>{error}</div>}
			{cvInfo ? (
				<div className='text-center mb-4'>
					<p className='text-lg'>
						Ya existe información de datos de contacto. Por favor,
						modifíque la que ya existe.
					</p>
					<Link
						to='/dashboard/update-cv'
						className='text-blue-500 hover:underline'>
						Editar
					</Link>
				</div>
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={FormValidationsCV}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(createCV(values));
						setSubmitting(false);
					}}>
					{({ isSubmitting }) => (
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
                            {/* Image */}
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
                            <ErrorMessage
                                name='imageUrl'
                                component='div'
                                className='text-red-500 text-sm'
                            />
							<div className='text-center'>
								<button
									type='submit'
									className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
									disabled={isSubmitting}>
									Submit
								</button>
							</div>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
};
