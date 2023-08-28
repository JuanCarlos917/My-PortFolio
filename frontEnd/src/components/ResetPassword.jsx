import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { resetPassword } from '../features/auth/authSlice';
import FormValidationsResetP from '../utils/FormValidationsResetP';

export const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Extraer el token de la URL
	const { verificationCode } = useParams();

	const { error, status, isLoggedIn } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/login');
		}
	}, [isLoggedIn, navigate]);

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className='container'>
			<h1>Reset Password</h1>
			{status === 'loading' ? (
				<div>Loading...</div>
			) : (
				<Formik
					initialValues={{ password: '', confirmPassword: '' }}
					validationSchema={FormValidationsResetP}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(
							resetPassword({
								verificationCode: verificationCode,
								password: values.password,
							}),
						);

						setSubmitting(false);
					}}>
					{({ isSubmitting }) => (
						<Form>
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
							<div className='form-group'>
								<label htmlFor='confirmPassword'>
									Confirm Password
								</label>
								<Field
									className='form-control'
									type='password'
									name='confirmPassword'
								/>
								<ErrorMessage
									className='text-danger'
									name='confirmPassword'
									component='div'
								/>
							</div>
							<button
								className='btn btn-primary'
								type='submit'
								disabled={isSubmitting}>
								Submit
							</button>
							<p>
								<Link to='/login'>Login</Link>
							</p>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
};
