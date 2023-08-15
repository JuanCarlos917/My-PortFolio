import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsExp from '../../utils/FormValidationsExp';
import {
	getProfessionalExp,
	updateProfessionalExp,
} from '../../features/professionalExp/professionalExpSlice';

export const UpdateExperience = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

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

	return (
		<div>
			{modified ? (
				<div>¡Modificación realizada con éxito!</div>
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
							<Link to='/dashboard/form-experience'>Crear</Link>
						</div>
					) : (
						<Formik
							initialValues={{
								company: specificExperience.company,
								position: specificExperience.position,
								description: specificExperience.description,
								startDate: specificExperience.startDate,
								endDate: specificExperience.endDate,
							}}
							validationSchema={FormValidationsExp}
							onSubmit={(values) => {
								dispatch(
									updateProfessionalExp({
										id: id,
										professionalExpInfo: {
											company: values.company,
											position: values.position,
											description: values.description,
											startDate: values.startDate,
											endDate: values.endDate,
										},
									}),
								);
							}}>
							<Form>
								<div>
									<label htmlFor='company'>Empresa:</label>
									<Field
										type='text'
										name='company'
										id='company'
									/>
									<ErrorMessage name='company' />
								</div>
								<div>
									<label htmlFor='position'>Puesto:</label>
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
									<label htmlFor='startDate'>
										Fecha de inicio:
									</label>
									<Field
										type='date'
										name='startDate'
										id='startDate'
									/>
									<ErrorMessage name='startDate' />
								</div>
								<div>
									<label htmlFor='endDate'>
										Fecha de finalización:
									</label>
									<Field
										type='date'
										name='endDate'
										id='endDate'
									/>
									<ErrorMessage name='endDate' />
								</div>
								<button type='submit'>Actualizar</button>
							</Form>
						</Formik>
					)}
				</>
			)}
		</div>
	);
};
