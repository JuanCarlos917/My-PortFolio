import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createAbout, getAbout } from '../../features/about/aboutSlice';
import FormValidationsAbout from '../../utils/FormValidationsAbout';
import { Link } from 'react-router-dom';

export const FormAbout = () => {
	const dispatch = useDispatch();
	const aboutInfo = useSelector((state) => state.about?.aboutInfo);
	const status = useSelector((state) => state.about.status);
	const error = useSelector((state) => state.about.error);

	useEffect(() => {
		if (!aboutInfo) {
			dispatch(getAbout());
		}
	}, [dispatch, aboutInfo]);

	const initialValues = {
		bio: '',
		skills: {
			frontend: '',
			backend: '',
			database: '',
		},
	};

	return (
		<div>
			{status === 'failed' && <div>{error}</div>}
			{aboutInfo ? (
				<div>
					<p>
						Ya existe información acerca de mí. Por favor, modifíque
						la que ya existe.
					</p>
					<Link to='/dashboard/update-about'>Editar</Link>
				</div>
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={FormValidationsAbout}
					onSubmit={(values, { setSubmitting }) => {
						values.skills.frontend = values.skills.frontend
							.split(',')
							.map((skill) => skill.trim());
						values.skills.backend = values.skills.backend
							.split(',')
							.map((skill) => skill.trim());
						values.skills.database = values.skills.database
							.split(',')
							.map((skill) => skill.trim());
						dispatch(createAbout(values));
						setSubmitting(false);
					}}>
					{({ isSubmitting }) => (
						<Form>
							<label htmlFor='bio'>Biografia</label>
							<Field as='textarea' name='bio' />
							<ErrorMessage name='bio' component='div' />

							<label htmlFor='skills.frontend'>Frontend</label>
							<Field
								type='text'
								name='skills.frontend'
								placeholder='habilidad1, habilidad2, habilidad3'
							/>
							<ErrorMessage
								name='skills.frontend'
								component='div'
							/>

							<label htmlFor='skills.backend'>Backend</label>
							<Field
								type='text'
								name='skills.backend'
								placeholder='habilidad1, habilidad2, habilidad3'
							/>
							<ErrorMessage
								name='skills.backend'
								component='div'
							/>

							<label htmlFor='skills.database'>
								Base de datos
							</label>
							<Field
								type='text'
								name='skills.database'
								placeholder='habilidad1, habilidad2, habilidad3'
							/>
							<ErrorMessage
								name='skills.database'
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
