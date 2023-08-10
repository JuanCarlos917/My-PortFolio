import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormValidationsExp from '../../utils/FormValidationsExp';
import { useDispatch, useSelector } from 'react-redux';
import {
	createProfessionalExp,
	getProfessionalExp,
} from '../../features/professionalExp/professionalExpSlice';

export const FormExperience = () => {

	const dispatch = useDispatch();
	const experienceInfo = useSelector(
		(state) => state.professionalExp.experienceInfo,
	);

	const status = useSelector((state) => state.professionalExp.status);
	const error = useSelector((state) => state.professionalExp.error);
	const experienceAdded = useSelector(
		(state) => state.professionalExp.experienceAdded,
	);

	useEffect(() => {
		if (!experienceInfo) {
			dispatch(getProfessionalExp());
		}
	}, [dispatch, experienceInfo]);

	const initialValues = {
		experiences: [
			{
				company: '',
				description: '',
				position: '',
				startDate: '',
				endDate: '',
			},
		],
	};
	return (
		<div>
			{experienceAdded && <div>¡Experiencia agregada con éxito!</div>}
			{status === 'loading' && <div>Actualizando...</div>}
			{status === 'failed' && <div>{error}</div>}
			<Formik
				initialValues={initialValues}
				validationSchema={FormValidationsExp}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(createProfessionalExp(values));
					setSubmitting(false);
				}}>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor='company'>Compañía</label>
						<Field type='text' name='company' />
						<ErrorMessage name='company' component='div' />
						<label htmlFor='description'>Descripción</label>
						<Field as='textarea' name='description' />
						<ErrorMessage name='description' component='div' />
						<label htmlFor='position'>Posición</label>
						<Field type='text' name='position' />
						<ErrorMessage name='position' component='div' />
						<label htmlFor='startDate'>Fecha de inicio</label>
						<Field type='date' name='startDate' />
						<ErrorMessage name='startDate' component='div' />
						<label htmlFor='endDate'>Fecha de finalización</label>
						<Field type='date' name='endDate' />
						<ErrorMessage name='endDate' component='div' />
						<button type='submit' disabled={isSubmitting}>
							Enviar
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
