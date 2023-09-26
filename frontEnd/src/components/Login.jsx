import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
import FormValidationsLogin from '../utils/FormValidationsLogin';
import { Button } from '@nextui-org/react';

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, isLoggedIn } = useSelector((state) => state.auth);
	// if user already logged in redirect to home page
	useEffect(() => {
		if (isLoggedIn !== false) {
			navigate('/dashboard');
		}
	}, [isLoggedIn, navigate]);

	return (
		<div className='min-h-screen flex items-start justify-center'>
			<div className=' p-8 rounded-lg shadow-md w-96'>
				<h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={FormValidationsLogin}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(loginUser(values));
						setSubmitting(false);
					}}>
					{({ isSubmitting }) => (
						<Form>
							<div className='mb-4'>
								<label
									className='block text-sm font-medium text-gray-700 mb-2'
									htmlFor='email'>
									Email
								</label>
								<Field
									className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
									type='email'
									name='email'
								/>
								<ErrorMessage
									className='text-sm text-red-500 mt-1'
									name='email'
									component='div'
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block text-sm font-medium text-gray-700 mb-2'
									htmlFor='password'>
									Password
								</label>
								<Field
									className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
									type='password'
									name='password'
								/>
								<ErrorMessage
									className='text-sm text-red-500 mt-1'
									name='password'
									component='div'
								/>
							</div>
							<Button
								size='sm'
								radius='sm'
								color='success'
								variant='ghost'
								className='w-full'
								type='submit'
								disabled={isSubmitting}>
								Submit
							</Button>
							{error && (
								<div className='text-sm text-red-500 mt-3'>
									{error}
								</div>
							)}
						</Form>
					)}
				</Formik>
				<div className='mt-4 text-center'>
					<p className='text-sm'>
						No tienes una cuenta?{' '}
						<Link
							className='text-blue-500 hover:underline'
							to='/signup'>
							Regístrate
						</Link>
					</p>
					<p className='text-sm'>
						Olvidaste tu contraseña?{' '}
						<Link
							className='text-blue-500 hover:underline'
							to='/forgot-password'>
							Restablecer contraseña
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
