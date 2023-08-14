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
	};
	return (
		<div>
			{status === 'failed' && <div>{error}</div>}
			{cvInfo ? (
				<div>
					<p>
						Ya existe información de datos de contacto. Por favor, modifíque la
						que ya existe.
					</p>
					<Link to='/dashboard/update-cv'>Editar</Link>
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
						<Form>
							<label htmlFor='name'>Nombre</label>
							<Field type='text' name='name' />
							<ErrorMessage name='name' component='div' />
							<label htmlFor='lastName'>Apellido</label>
							<Field type='text' name='lastName' />
							<ErrorMessage name='lastName' component='div' />
							<label htmlFor='email'>Email</label>
							<Field type='email' name='email' />
							<ErrorMessage name='email' component='div' />
							<label htmlFor='phone'>Teléfono</label>
							<Field type='text' name='phone' />
							<ErrorMessage name='phone' component='div' />
							{/* Social media */}
							<label htmlFor='social_media.linkedin'>
								Linkedin
							</label>
							<Field type='text' name='social_media.linkedin' />
							<ErrorMessage
								name='social_media.linkedin'
								component='div'
							/>
							<label htmlFor='social_media.github'>Github</label>
							<Field type='text' name='social_media.github' />
							<ErrorMessage
								name='social_media.github'
								component='div'
							/>
							<button type='submit' disabled={isSubmitting}>
								Submit
							</button>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
};
