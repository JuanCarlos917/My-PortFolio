import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsEduca from '../../utils/FormValidationsEduca';

import {
	getEducation,
	updateEducation,
} from '../../features/education/educationSlice';

import {
	saveToLocalStorage,
	removeFromLocalStorage,
} from '../localStorageHelpers/localStorageHelpers';

export const UpdateEducations = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [showForm, setShowForm] = useState(true);
	const [cancelledModification, setCancelledModification] = useState(false);

	// Obtén la lista completa de educaciones
	const educationInfo = useSelector(
		(state) => state.education?.educationInfo,
	);
	// Busca la educación específica basándote en el ID
	const specificEducation = Array.isArray(educationInfo)
		? educationInfo.find((edu) => edu.id.toString() === id)
		: null;

	const status = useSelector((state) => state.education.status);
	const error = useSelector((state) => state.education.error);
	const modified = useSelector((state) => state.education.modified);

	// Solicita siempre la información de educación al cargar el componente
	useEffect(() => {
		dispatch(getEducation());
	}, [dispatch]);

	useEffect(() => {
		if (modified) {
			removeFromLocalStorage('educationInfoUpdate');
			setShowForm(false); // Esconde el formulario después de una actualización exitosa
		}
	}, [modified]);

	return (
		<div>
			{modified && showForm === false ? (
				<div>¡Modificación realizada con éxito!</div>
			) : cancelledModification ? ( // Comprobar si la modificación fue cancelada
				<div>
					¡No se modificó nada!
					<button
						onClick={() => {
							setShowForm(true);
							setCancelledModification(false); // Resetear el estado al intentar de nuevo
						}}>
						Modificar de nuevo
					</button>
				</div>
			) : (
				<>
					{status === 'loading' && <div>Actualizando...</div>}
					{status === 'failed' && <div>{error}</div>}
					{!specificEducation ? (
						<div>
							<p>
								No existe información de educación, para
								modificar.
							</p>
							<Link to='/dashboard/form-education'>Crear</Link>
						</div>
					) : (
						<Formik
							initialValues={{
								degree: specificEducation.degree,
								description: specificEducation.description,
								institution: specificEducation.institution,
								field_of_study:
									specificEducation.field_of_study,
								startDate: specificEducation.startDate,
								endDate: specificEducation.endDate,
							}}
							validationSchema={FormValidationsEduca}
							onSubmit={(values) => {
								// Pide confirmación al usuario
								const userConfirmed = window.confirm(
									'¿Estás seguro de que deseas realizar la modificación?',
								);
								if (userConfirmed) {
									dispatch(
										updateEducation({
											id: id,
											educationInfo: {
												degree: values.degree,
												description: values.description,
												institution: values.institution,
												field_of_study:
													values.field_of_study,
												startDate: values.startDate,
												endDate: values.endDate,
											},
										}),
									);
								} else {
									setCancelledModification(true);
									// Guardar el proyecto actualizado en localStorage
									saveToLocalStorage('educationInfoUpdate', {
										educationInfo: {
											degree: values.degree,
											description: values.description,
											institution: values.institution,
											field_of_study:
												values.field_of_study,
											startDate: values.startDate,
											endDate: values.endDate,
										},
									});
								}
							}}>
							{() => (
								<Form>
									<label htmlFor='degree'>Grado</label>
									<Field type='text' name='degree' />
									<ErrorMessage
										name='degree'
										component='div'
									/>
									<label htmlFor='description'>
										Descripción
									</label>
									<Field as='textarea' name='description' />
									<ErrorMessage
										name='description'
										component='div'
									/>
									<label htmlFor='institution'>
										Institución
									</label>
									<Field type='text' name='institution' />
									<ErrorMessage
										name='institution'
										component='div'
									/>
									<label htmlFor='field_of_study'>
										Campo de estudio
									</label>
									<Field type='text' name='field_of_study' />
									<ErrorMessage
										name='field_of_study'
										component='div'
									/>
									<label htmlFor='startDate'>
										Fecha de inicio
									</label>
									<Field type='date' name='startDate' />
									<ErrorMessage
										name='startDate'
										component='div'
									/>
									<label htmlFor='endDate'>
										Fecha de finalización
									</label>
									<Field type='date' name='endDate' />
									<ErrorMessage
										name='endDate'
										component='div'
									/>
									<button type='submit'>Actualizar</button>
								</Form>
							)}
						</Formik>
					)}
				</>
			)}
		</div>
	);
};
