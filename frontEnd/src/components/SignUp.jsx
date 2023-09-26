import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../features/auth/authSlice';
import FormValidationsSignIn from '../utils/FormValidationsSignIn';
import { Button } from '@nextui-org/react';

export const SignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, status, isLoggedIn } = useSelector((state) => state.auth);

	if (isLoggedIn) {
		navigate('/dashboard');
	}

	if (error) {
		return (
			<div className='text-red-500 font-medium text-center mt-5'>
				{error}
			</div>
		);
	}

	return (
		<div className='min-h-screen flex items-start justify-center '>
			<div className='p-8 rounded-lg shadow-md w-96'>
				<h1 className='text-2xl font-bold mb-6 text-center'>Sign Up</h1>
				{status === 'idle' ? (
					<Formik
						initialValues={{
							email: '',
							password: '',
							confirmPassword: '',
						}}
						validationSchema={FormValidationsSignIn}
						onSubmit={(values, { setSubmitting }) => {
							dispatch(registerUser(values));
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
								<div className='mb-4'>
									<label
										className='block text-sm font-medium text-gray-700 mb-2'
										htmlFor='confirmPassword'>
										Confirm Password
									</label>
									<Field
										className='w-full p-2 border rounded focus:outline-none focus:border-blue-500'
										type='password'
										name='confirmPassword'
									/>
									<ErrorMessage
										className='text-sm text-red-500 mt-1'
										name='confirmPassword'
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
									Register
								</Button>
								<div className='mt-4 text-center'>
									<p>
										Ya tiene tu cuenta?{' '}
										<Link
											to='/login'
											className='text-blue-500 hover:underline'>
											Ingresar
										</Link>
									</p>
								</div>
							</Form>
						)}
					</Formik>
				) : (
					<div className='text-center'>
						<div className='text-green-500 font-medium mb-3'>
							Registration successful!
						</div>
						<Button
							size='sm'
							radius='sm'
							color='success'
							variant='ghost'
							onClick={() => navigate('/login')}>
							Login
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};
