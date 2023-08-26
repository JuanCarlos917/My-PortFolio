import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../features/auth/authSlice';
import FormValidationsForgotP from '../utils/FormValidationsForgotP';

export const ForgotPasswordAcount = () => {
	const dispatch = useDispatch();

	const { error, status } = useSelector(
		(state) => state.auth,
	);


	return (
		<div className='container'>
			<h1>Forgot Password</h1>
			{status === 'loading' ? (
				<div>Loading...</div>
			) : status === 'succeeded' ? (
				<div>
					Si tu dirección de correo electrónico está en nuestra base
					de datos, te hemos enviado instrucciones.
                    <div>
                        <Link to='/login'>Login</Link>
                    </div>
				</div>
			) : (
				<Formik
					initialValues={{ email: '' }}
					validationSchema={FormValidationsForgotP}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(forgotPassword(values));
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
			{error && (
				<div className='error-message'>
					{error} - Correo no registrado
				</div>
			)}
		</div>
	);
};
