import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsExp from '../../utils/FormValidationsExp';

import {
	getProfessionalExp,
	updateProfessionalExp,
} from '../../features/professionalExp/professionalExpSlice';

import {
	saveToLocalStorage,
	removeFromLocalStorage,
} from '../localStorageHelpers/localStorageHelpers';

export const UpdateExperience = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [showForm, setShowForm] = useState(true);
	const [cancelledModification, setCancelledModification] = useState(false);

	// Obtén la lista completa de experiencias
	const professionalExpInfo = useSelector(
		(state) => state.professionalExp?.professionalExpInfo,
	);
	// Busca la experiencia específica basándote en el ID
	const specificExperience = Array.isArray(professionalExpInfo)
		? professionalExpInfo.find((exp) => exp.id.toString() === id)
		: null;

	const status = useSelector((state) => state.professionalExp.status);
	const error = useSelector((state) => state.professionalExp.error);
	const modified = useSelector((state) => state.professionalExp.modified);

	// Solicita siempre la información de experiencia al cargar el componente
	useEffect(() => {
		dispatch(getProfessionalExp());
	}, [dispatch]);

	useEffect(() => {
		if (modified) {
			removeFromLocalStorage('experienceInfoUpdate');
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
					{!specificExperience ? (
						<div>
							<p>
								No existe información de experiencia, para
								modificar.
							</p>
							<Link to='/dashboard/form-professionalExp'>
								Crear
							</Link>
						</div>
					) : (
						<>
							<Formik
								initialValues={{
									company: specificExperience.company,
									position: specificExperience.position,
									description: specificExperience.description,
									startYearMonth: `${specificExperience.startYear}-${specificExperience.startMonth}`,
									endYearMonth: `${specificExperience.endYear}-${specificExperience.endMonth}`,
								}}
								validationSchema={FormValidationsExp}
								onSubmit={(values) => {
									// Divide los valores "YYYY-MM" en año y mes
									const [startYear, startMonth] =
										values.startYearMonth.split('-');
									let endYear, endMonth;
									if (values.endYearMonth) {
										[endYear, endMonth] =
											values.endYearMonth.split('-');
									} else {
										endYear = '';
										endMonth = '';
									}
									const userConfirmed = window.confirm(
										'¿Estás seguro de que deseas realizar la modificación?',
									);

									if (userConfirmed) {
										dispatch(
											updateProfessionalExp({
												id: id,
												professionalExpInfo: {
													company: values.company,
													position: values.position,
													description:
														values.description,
													startYear: startYear,
													startMonth: startMonth,
													endYear: endYear,
													endMonth: endMonth,
												},
											}),
										);
									} else {
										setCancelledModification(true);
										// Guardar el proyecto actualizado en localStorage
										saveToLocalStorage(
											'experienceInfoUpdate',
											{
												professionalExpInfo: {
													company: values.company,
													position: values.position,
													description:
														values.description,
													startYear: values.startYear,
													startMonth:
														values.startMonth,
													endYear: values.endYear,
													endMonth: values.endMonth,
												},
											},
										);
									}
								}}>
								<Form>
									<div>
										<label htmlFor='company'>
											Empresa:
										</label>
										<Field
											type='text'
											name='company'
											id='company'
										/>
										<ErrorMessage name='company' />
									</div>
									<div>
										<label htmlFor='position'>
											Puesto:
										</label>
										<Field
											type='text'
											name='position'
											id='position'
										/>
										<ErrorMessage name='position' />
									</div>
									<div>
										<label htmlFor='description'>
											Descripción:
										</label>
										<Field
											as='textarea'
											name='description'
											id='description'
										/>
										<ErrorMessage name='description' />
									</div>
									<div>
										<label htmlFor='startYearMonth'>
											Mes y año de inicio:
										</label>
										<Field
											type='month'
											name='startYearMonth'
											id='startYearMonth'
										/>
										<ErrorMessage name='startYearMonth' />
									</div>
									<div>
										<label htmlFor='endYearMonth'>
											Mes y año de finalización:
										</label>
										<Field
											type='month'
											name='endYearMonth'
											id='endYearMonth'
										/>
										{!specificExperience.endYearMonth && (
											<span>Actual</span>
										)}
										<ErrorMessage name='endYearMonth' />
									</div>
									<button type='submit'>Actualizar</button>
								</Form>
							</Formik>
						</>
					)}
				</>
			)}
		</div>
	);
};
