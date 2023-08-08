import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormValidationsCV from '../../utils/FormValidationsCV';
import { Link } from 'react-router-dom';
import { getCV, updateCV } from '../../features/cv/cvSlice';

export const UpdateCV = () => {
	const dispatch = useDispatch();
	const cvInfo = useSelector((state) => state.cv.cvInfo);
	const id = useSelector((state) => state.cv.id);
	const status = useSelector((state) => state.cv.status);
	const error = useSelector((state) => state.cv.error);
	const modified = useSelector((state) => state.cv.modified);

	useEffect(() => {
		if (!cvInfo) {
			dispatch(getCV());
		}
	}, [dispatch, cvInfo]);
	return (
		<div>
			{modified && <div>¡Modificación realizada con éxito!</div>}
			{status === 'loading' && <div>Actualizando...</div>}
			{status === 'failed' && <div>{error}</div>}
			{!cvInfo ? (
				<div>
					<p>No existe información de CV, para modificar.</p>
					<Link to='/dashboard/form-cv'>Crear</Link>
				</div>
			) : (
				<Formik
					initialValues={{
						name: cvInfo?.name || '',
						lastName: cvInfo?.lastName || '',
						email: cvInfo?.email || '',
						phone: cvInfo?.phone || '',
						social_media: {
							linkedin: cvInfo?.social_media?.linkedin || '',
							github: cvInfo?.social_media?.github || '',
						},
						proyects: {
							proyect1:
								cvInfo?.proyects?.proyect1.join(', ') || '',
							proyect2:
								cvInfo?.proyects?.proyect2.join(', ') || '',
							proyect3:
								cvInfo?.proyects?.proyect3.join(', ') || '',
							proyect4:
								cvInfo?.proyects?.proyect4.join(', ') || '',
						},
						experience: {
							experience1: cvInfo?.experience?.experience1 || '',
							experience2: cvInfo?.experience?.experience2 || '',
							experience3: cvInfo?.experience?.experience3 || '',
							experience4: cvInfo?.experience?.experience4 || '',
						},
					}}
					validationSchema={FormValidationsCV}
					onSubmit={(values) => {
						const {
							name,
							lastName,
							email,
							phone,
							social_media,
							proyects,
							experience,
						} = values;
						const transformedProyects = {
							proyect1: proyects.proyect1
								.split(',')
								.map((proyect) => proyect.trim()),
							proyect2: proyects.proyect2
								.split(',')
								.map((proyect) => proyect.trim()),
							proyect3: proyects.proyect3
								.split(',')
								.map((proyect) => proyect.trim()),
							proyect4: proyects.proyect4
								.split(',')
								.map((proyect) => proyect.trim()),
						};
						const transformedExperience = {
							experience1: experience.experience1,
							experience2: experience.experience2,
							experience3: experience.experience3,
							experience4: experience.experience4,
						};
						const cvInfo = {
							name,
							lastName,
							email,
							phone,
							social_media,
							proyects: transformedProyects,
							experience: transformedExperience,
						};
						dispatch(
							updateCV({
								id: id,
								cvInfo,
							}),
						);
					}}>
					{() => (
						<Form>
							<label>
								Nombre:
								<Field type='text' name='name' />
								<ErrorMessage name='name' component='div' />
							</label>
							<label>
								Apellido:
								<Field type='text' name='lastName' />
								<ErrorMessage name='lastName' component='div' />
							</label>
							<label>
								Email:
								<Field type='email' name='email' />
								<ErrorMessage name='email' component='div' />
							</label>
							<label>
								Teléfono:
								<Field type='text' name='phone' />
								<ErrorMessage name='phone' component='div' />
							</label>
							<label>
								LinkedIn:
								<Field
									type='text'
									name='social_media.linkedin'
								/>
								<ErrorMessage
									name='social_media.linkedin'
									component='div'
								/>
							</label>
							<label>
								GitHub:
								<Field type='text' name='social_media.github' />
								<ErrorMessage
									name='social_media.github'
									component='div'
								/>
							</label>
							<label>
								Proyectos - Proyecto 1:
								<Field
									type='text'
									name='proyects.proyect1'
									placeholder='proyecto1, proyecto2, proyecto3'
								/>
								<ErrorMessage
									name='proyects.proyect1'
									component='div'
								/>
							</label>
							<label>
								Proyectos - Proyecto 2:
								<Field
									type='text'
									name='proyects.proyect2'
									placeholder='proyecto1, proyecto2, proyecto3'
								/>
								<ErrorMessage
									name='proyects.proyect2'
									component='div'
								/>
							</label>
							<label>
								Proyectos - Proyecto 3:
								<Field
									type='text'
									name='proyects.proyect3'
									placeholder='proyecto1, proyecto2, proyecto3'
								/>
								<ErrorMessage
									name='proyects.proyect3'
									component='div'
								/>
							</label>
							<label>
								Proyectos - Proyecto 4:
								<Field
									type='text'
									name='proyects.proyect4'
									placeholder='proyecto1, proyecto2, proyecto3'
								/>
								<ErrorMessage
									name='proyects.proyect4'
									component='div'
								/>
							</label>
							<label>
								Experiencia - Experiencia 1:
								<Field
									type='text'
									name='experience.experience1'
								/>
								<ErrorMessage
									name='experience.experience1'
									component='div'
								/>
							</label>
							<label>
								Experiencia - Experiencia 2:
								<Field
									type='text'
									name='experience.experience2'
								/>
								<ErrorMessage
									name='experience.experience2'
									component='div'
								/>
							</label>
							<label>
								Experiencia - Experiencia 3:
								<Field
									type='text'
									name='experience.experience3'
								/>
								<ErrorMessage
									name='experience.experience3'
									component='div'
								/>
							</label>
							<label>
								Experiencia - Experiencia 4:
								<Field
									type='text'
									name='experience.experience4'
								/>
								<ErrorMessage
									name='experience.experience4'
									component='div'
								/>
							</label>
							<button type='submit'>Update</button>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
};
