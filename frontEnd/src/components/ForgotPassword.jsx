import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../features/auth/authSlice';
import FormValidationsForgotP from '../utils/FormValidationsForgotP';
import { Loading } from './Loading/Loading';
import { Button } from '@nextui-org/react';

export const ForgotPasswordAcount = () => {
	const dispatch = useDispatch();
	const { error, status } = useSelector((state) => state.auth);

	return (
		<div className='container mx-auto p-8 flex flex-col items-center'>
			<h1 className='text-2xl font-bold mb-6'>Forgot Password</h1>

			{status === 'loading' && <Loading />}

			{status === 'succeeded' && (
				<div className='bg-green-100 p-4 rounded-md text-center mb-4'>
					Si tu dirección de correo electrónico está en nuestra base
					de datos, te hemos enviado instrucciones.
					<div className='mt-2'>
						<Button
							size='sm'
							radius='sm'
							color='success'
							variant='ghost'
							as={Link}
							to='/login'>
							Login
						</Button>
					</div>
				</div>
			)}
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				{status !== 'loading' && status !== 'succeeded' && (
					<Formik
						initialValues={{ email: '' }}
						validationSchema={FormValidationsForgotP}
						onSubmit={(values, { setSubmitting }) => {
							dispatch(forgotPassword(values));
							setSubmitting(false);
						}}>
						{({ isSubmitting }) => (
							<Form className='w-full max-w-md'>
								<div className='mb-4'>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-gray-700 mb-2'>
										Email
									</label>
									<Field
										className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
										type='email'
										name='email'
									/>
									<ErrorMessage
										className='text-red-500 text-xs mt-1'
										name='email'
										component='div'
									/>
								</div>
								<div className='flex justify-between'>
									<Button
										size='sm'
										radius='sm'
										color='warning'
										variant='ghost'
										type='submit'
										disabled={isSubmitting}>
										Enviar
									</Button>
									<Button
										size='sm'
										radius='sm'
										color='success'
										variant='ghost'
										as={Link}
										to='/login'>
										Login
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				)}
			</div>
			{error && (
				<div className='mt-4 bg-red-100 p-4 rounded-md text-red-600'>
					{error} - Correo no registrado
				</div>
			)}
		</div>
	);
};
