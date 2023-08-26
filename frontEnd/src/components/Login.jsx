import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
import FormValidationsLogin from '../utils/FormValidationsLogin';

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
		<div className='container'>
			<h1>Login</h1>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={FormValidationsLogin}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(loginUser(values));
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
						{error && (
							<div className='alert alert-danger mt-3'>
								{error}
							</div>
						)}
					</Form>
				)}
			</Formik>
			<div>
				<p>
					Forgot your password?
					<Link to='/forgot-password'> Reset Password</Link>
				</p>
				<p>
					Don t have an account?
					<Link to='/signup'> Sign Up</Link>
				</p>
			</div>
		</div>
	);
};
