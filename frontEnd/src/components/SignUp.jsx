
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/auth/authSlice';
import FormValidationsSignIn from '../utils/FormValidationsSignIn';

export const SignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, status, isLoggedIn } = useSelector((state) => state.auth);

	if (isLoggedIn) {
		navigate('/dashboard');
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className='container'>
			<h1>Sign Up</h1>
			{status === 'idle' ? (
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={FormValidationsSignIn}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(registerUser(values));
						setSubmitting(false);
					}}>
					{({ isSubmitting }) => (
						<Form>
							<div className='form-group'>
								<label htmlFor='email'>Email</label>
								<Field
									className='form-control'
									type='email'
									name='email'
								/>
								<ErrorMessage
									className='text-danger'
									name='email'
									component='div'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='password'>Password</label>
								<Field
									className='form-control'
									type='password'
									name='password'
								/>
								<ErrorMessage
									className='text-danger'
									name='password'
									component='div'
								/>
							</div>
							<button
								className='btn btn-primary'
								type='submit'
								disabled={isSubmitting}>
								Submit
							</button>
						</Form>
					)}
				</Formik>
			) : (
				<>
					<div>Registro exitoso!</div>
                    <button
                        className='btn btn-primary'
                        onClick={() => navigate('/login')}>
                        Iniciar sesión
                    </button>
				</>
			)}
		</div>
	);
};
