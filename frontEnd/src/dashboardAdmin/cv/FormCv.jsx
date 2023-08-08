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
		proyects: {
			proyect1: '',
			proyect2: '',
			proyect3: '',
			proyect4: '',
		},
		experience: {
			experience1: '',
			experience2: '',
			experience3: '',
			experience4: '',
		},

	};
	return (
		<div>
			{status === 'failed' && <div>{error}</div>}
			{cvInfo ? (
				<div>
					<p>
						Ya existe información acerca CV. Por favor, modifíque la
						que ya existe.
					</p>
					<Link to='/dashboard/update-cv'>Editar</Link>
				</div>
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={FormValidationsCV}
					onSubmit={(values, { setSubmitting }) => {
						values.proyects.proyect1 = values.proyects.proyect1
							.split(',')
							.map((proyect) => proyect.trim());
						values.proyects.proyect2 = values.proyects.proyect2
							.split(',')
							.map((proyect) => proyect.trim());
						values.proyects.proyect3 = values.proyects.proyect3
							.split(',')
							.map((proyect) => proyect.trim());
						values.proyects.proyect4 = values.proyects.proyect4
							.split(',')
							.map((proyect) => proyect.trim());
						values.experience.experience1 =
							values.experience.experience1
								.split(',')
								.map((experience) => experience.trim());
						values.experience.experience2 =
							values.experience.experience2
								.split(',')
								.map((experience) => experience.trim());
						values.experience.experience3 =
							values.experience.experience3
								.split(',')
								.map((experience) => experience.trim());
						values.experience.experience4 =
							values.experience.experience4
								.split(',')
								.map((experience) => experience.trim());
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

							{/* Proyectos */}
							<label htmlFor='proyects.proyect1'>
								Proyecto 1
							</label>
							<Field
								type='text'
								name='proyects.proyect1'
								placeholder='proyecto1, proyecto2, proyecto3'
							/>
							<ErrorMessage
								name='proyects.proyect1'
								component='div'
							/>
							<label htmlFor='proyects.proyect2'>
								Proyecto 2
							</label>
							<Field
								type='text'
								name='proyects.proyect2'
								placeholder='proyecto1, proyecto2, proyecto3'
							/>
							<ErrorMessage
								name='proyects.proyect2'
								component='div'
							/>
							<label htmlFor='proyects.proyect3'>
								Proyecto 3
							</label>
							<Field
								type='text'
								name='proyects.proyect3'
								placeholder='proyecto1, proyecto2, proyecto3'
							/>
							<ErrorMessage
								name='proyects.proyect3'
								component='div'
							/>
							<label htmlFor='proyects.proyect4'>
								Proyecto 4
							</label>
							<Field
								type='text'
								name='proyects.proyect4'
								placeholder='proyecto1, proyecto2, proyecto3'
							/>
							<ErrorMessage
								name='proyects.proyect4'
								component='div'
							/>
							{/* Experiencia */}
							<label htmlFor='experience.experience1'>
								Experiencia 1
							</label>
							<Field
								type='text'
								name='experience.experience1'
								placeholder='experiencia1, experiencia2, experiencia3'
							/>
							<ErrorMessage
								name='experience.experience1'
								component='div'
							/>
							<label htmlFor='experience.experience2'>
								Experiencia 2
							</label>
							<Field
								type='text'
								name='experience.experience2'
								placeholder='experiencia1, experiencia2, experiencia3'
							/>
							<ErrorMessage
								name='experience.experience2'
								component='div'
							/>
							<label htmlFor='experience.experience3'>
								Experiencia 3
							</label>
							<Field
								type='text'
								name='experience.experience3'
								placeholder='experiencia1, experiencia2, experiencia3'
							/>
							<ErrorMessage
								name='experience.experience3'
								component='div'
							/>
							<label htmlFor='experience.experience4'>
								Experiencia 4
							</label>
							<Field
								type='text'
								name='experience.experience4'
								placeholder='experiencia1, experiencia2, experiencia3'
							/>
							<ErrorMessage
								name='experience.experience4'
								component='div'
							/>
							<ErrorMessage name='skills' component='div' />
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
