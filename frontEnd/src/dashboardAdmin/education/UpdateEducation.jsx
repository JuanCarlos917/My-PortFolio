import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormValidationsEduca from '../../utils/FormValidationsEduca';
import {
	getEducation,
	updateEducation,
} from '../../features/education/educationSlice';


export const UpdateEducation = () => {
    const dispatch = useDispatch();
    const educationInfo = useSelector(
        (state) => state.education?.educationInfo,
    );
    const id = useSelector((state) => state.education.id);
    const status = useSelector((state) => state.education.status);
    const error = useSelector((state) => state.education.error);
    const modified = useSelector((state) => state.education.modified);

    useEffect(() => {
        if (!educationInfo) {
            dispatch(getEducation());
        }
    }, [dispatch, educationInfo]);

    return (
		<div>
			{modified && <div>¡Modificación realizada con éxito!</div>}
			{status === 'loading' && <div>Actualizando...</div>}
			{status === 'failed' && <div>{error}</div>}
			{!educationInfo ? (
				<div>
					<p>No existe información de educación, para modificar.</p>
					<Link to='/dashboard/form-education'>Crear</Link>
				</div>
			) : (
				<Formik
					initialValues={{
						degree: educationInfo?.degree || '',
						description: educationInfo?.description || '',
						institution: educationInfo?.institution || '',
						field_of_study: educationInfo?.field_of_study || '',
						startDate: educationInfo?.startDate || '',
						endDate: educationInfo?.endDate || '',
					}}
					validationSchema={FormValidationsEduca}
					onSubmit={(values) => {
						dispatch(
							updateEducation({
								id: id,
								educationInfo: {
									degree: values.degree,
									description: values.description,
									institution: values.institution,
									field_of_study: values.field_of_study,
									startDate: values.startDate,
									endDate: values.endDate,
								},
							}),
						);
					}}>
					{() => (
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
							<label htmlFor='field_of_study'>
								Campo de estudio
							</label>
							<Field type='text' name='field_of_study' />
							<ErrorMessage
								name='field_of_study'
								component='div'
							/>
							<label htmlFor='startDate'>Fecha de inicio</label>
							<Field type='date' name='startDate' />
							<ErrorMessage name='startDate' component='div' />
							<label htmlFor='endDate'>
								Fecha de finalización
							</label>
							<Field type='date' name='endDate' />
							<ErrorMessage name='endDate' component='div' />
							<button type='submit'>Actualizar</button>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
}