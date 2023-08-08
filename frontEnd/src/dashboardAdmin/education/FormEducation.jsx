import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormValidationsEduca from '../../utils/FormValidationsEduca';
import { useDispatch, useSelector } from 'react-redux';
import {
	createEducation,
	getEducation,
} from '../../features/education/educationSlice';
export const FormEducation = () => {
	const dispatch = useDispatch();
	const educationInfo = useSelector(
		(state) => state.education?.educationInfo,
	);

	const status = useSelector((state) => state.education.status);
	const error = useSelector((state) => state.education.error);
	const educationAdded = useSelector(
		(state) => state.education.educationAdded,
	);

	useEffect(() => {
		if (!educationInfo) {
			dispatch(getEducation());
		}
	}, [dispatch, educationInfo]);

	const initialValues = {
		educations: [
			{
				degree: '',
				description: '',
				institution: '',
				field_of_study: '',
				startDate: '',
				endDate: '',
			},
		],
	};
	return (
		<div>
			{educationAdded && <div>¡Educación agregada con éxito!</div>}
			{status === 'loading' && <div>Actualizando...</div>}
			{status === 'failed' && <div>{error}</div>}
			<Formik
				initialValues={initialValues}
				validationSchema={FormValidationsEduca}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(createEducation(values));
					setSubmitting(false);
				}}>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor='degree'>Grado</label>
						<Field type='text' name='degree' />
						<ErrorMessage name='degree' component='div' />
						<label htmlFor='description'>Descripción</label>
						<Field as='textarea' name='description' />
						<ErrorMessage name='description' component='div' />
						<label htmlFor='institution'>Institución</label>
						<Field type='text' name='institution' />
						<ErrorMessage name='institution' component='div' />
						<label htmlFor='field_of_study'>Campo de estudio</label>
						<Field type='text' name='field_of_study' />
						<ErrorMessage name='field_of_study' component='div' />
						<label htmlFor='startDate'>Fecha de inicio</label>
						<Field type='date' name='startDate' />
						<ErrorMessage name='startDate' component='div' />
						<label htmlFor='endDate'>Fecha de finalización</label>
						<Field type='date' name='endDate' />
						<ErrorMessage name='endDate' component='div' />
						<button type='submit' disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
