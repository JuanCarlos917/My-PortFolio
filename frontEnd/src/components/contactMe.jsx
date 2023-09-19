import { useDispatch, useSelector } from 'react-redux';
import { postContactMe } from '../features/contactMe/contactMeSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormValidationsContactMe from '../utils/FormValidationsContactMe';
import { Loading } from './Loading/Loading';

export const ContactMe = () => {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.contactMe.status);
	const error = useSelector((state) => state.contactMe.error);
	const sendSuccess = useSelector((state) => state.contactMe.send);

	const initialValues = { name: '', email: '', message: '' };

	return (
		<div className='flex flex-col items-center justify-center w-full h-scree'>
			{status === 'failed' && (
				<div className='text-red-500 mb-4'>{error}</div>
			)}
			{status === 'loading' && (
				<div className='text-yellow-500 mb-4'>
					<Loading />
				</div>
			)}

			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				{sendSuccess && (
					<div className='flex flex-col items-center justify-center text-green-500 mb-4 '>
						¡Mensaje enviado con éxito!
					</div>
				)}
				<h1 className='text-3xl font-semibold mb-4'>
					Contactate Conmigo
				</h1>
				<p className='text-gray-600 mb-4'>
					¿Cómo puedo ayudarte? Escríbeme.
				</p>
				<Formik
					initialValues={initialValues}
					validationSchema={FormValidationsContactMe}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						dispatch(postContactMe(values))
							.unwrap()
							.then(() => {
								resetForm(); // Limpia el formulario si fue exitoso
							})
							.finally(() => {
								setSubmitting(false); // Finaliza el estado de envío
							});
					}}>
					{() => (
						<Form>
							<div className='mb-4'>
								<label
									htmlFor='name'
									className='block text-sm font-medium text-gray-700 mb-2'>
									Nombre
								</label>
								<Field
									type='text'
									name='name'
									id='name'
									className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
								/>
								<ErrorMessage
									name='name'
									component='div'
									className='text-red-500 mt-1 text-sm'
								/>
							</div>

							<div className='mb-4'>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-700 mb-2'>
									Email
								</label>
								<Field
									type='email'
									name='email'
									id='email'
									className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
								/>
								<ErrorMessage
									name='email'
									component='div'
									className='text-red-500 mt-1 text-sm'
								/>
							</div>

							<div className='mb-4'>
								<label
									htmlFor='message'
									className='block text-sm font-medium text-gray-700 mb-2'>
									Mensaje
								</label>
								<Field
									as='textarea'
									name='message'
									id='message'
									rows='4'
									className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
								/>
								<ErrorMessage
									name='message'
									component='div'
									className='text-red-500 mt-1 text-sm'
								/>
							</div>

							<div>
								<button
									type='submit'
									className='w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50'>
									Estoy Listo, ¿Y Tú?...Enviar
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
