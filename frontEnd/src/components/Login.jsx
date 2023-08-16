import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import FormValidationsSignIn  from '../utils/FormValidationsSignIn';


export const Login = () => {
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.auth);

    useEffect(() => {
        document.title = 'Login';
    }, []);

    return (
		<div className='container'>
			<h1>Login</h1>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={FormValidationsSignIn}
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
		</div>
	);
}
