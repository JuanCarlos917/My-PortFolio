import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createAbout, updateAbout } from '../features/about/aboutSlice';
import FormValidationsAbout from '../utils/FormValidationsAbout';

export const FormAbout = () => {
	const dispatch = useDispatch();
	const aboutInfo = useSelector((state) => state.about.aboutInfo);
	const initialValues = aboutInfo || {
		bio: '',
		skills: {
			frontend: '',
			backend: '',
			database: '',
		},
		experience: '',
	};

	return (
		<div>
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

					if (aboutInfo) {
						dispatch(updateAbout(values));
					} else {
						dispatch(createAbout(values));
					}
					setSubmitting(false);
				}}>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor='bio'>Biografia</label>
						<Field type='text' name='bio' />
						<ErrorMessage name='bio' component='div' />
						<label htmlFor='skills.frontend'>
							Front end
						</label>
						<Field type='text' name='skills.frontend' />
						<ErrorMessage name='skills.frontend' component='div' />
						<label htmlFor='skills.backend'>Backend</label>
						<Field type='text' name='skills.backend' />
						<ErrorMessage name='skills.backend' component='div' />
						<label htmlFor='skills.database'>Base de datos</label>
						<Field type='text' name='skills.database' />
						<ErrorMessage name='skills.database' component='div' />
						<label htmlFor='experience'>Experiencia</label>
						<Field type='text' name='experience' />
						<ErrorMessage name='experience' component='div' />
						<button type='submit' disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
