import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import FormValidationsAbout from '../../utils/FormValidationsAbout';
import { getAbout, updateAbout } from '../../features/about/aboutSlice';

export const UpdateAbout = () => {
	const dispatch = useDispatch();
	const aboutInfo = useSelector((state) => state.about?.aboutInfo);
	const id = useSelector((state) => state.about.id);
    const status = useSelector((state) => state.about.status);
	const error = useSelector((state) => state.about.error);
    const modified = useSelector((state) => state.about.modified);


	useEffect(() => {
		if (!aboutInfo) {
			dispatch(getAbout());
		}
	}, [dispatch, aboutInfo]);

	return (
		<div>
			{modified && <div>¡Modificación realizada con éxito!</div>}
			{status === 'loading' && <div>Actualizando...</div>}
			{status === 'failed' && <div>{error}</div>}
			{!aboutInfo ? (
				<div>
					<p>
						No existe información de acerca de mí, para modificar.
					</p>
					<Link to='/dashboard/form-about'>Crear</Link>
				</div>
			) : (
				<Formik
					initialValues={{
						bio: aboutInfo?.bio || '',
						skills: {
							frontend:
								aboutInfo?.skills?.frontend.join(', ') || '',
							backend:
								aboutInfo?.skills?.backend.join(', ') || '',
							database:
								aboutInfo?.skills?.database.join(', ') || '',
						},
					}}
					validationSchema={FormValidationsAbout}
					onSubmit={(values) => {
						const { bio, skills } = values;
						const transformedSkills = {
							frontend: skills.frontend
								.split(',')
								.map((skill) => skill.trim()),
							backend: skills.backend
								.split(',')
								.map((skill) => skill.trim()),
							database: skills.database
								.split(',')
								.map((skill) => skill.trim()),
						};

						dispatch(
							updateAbout({
								id: id,
								aboutInfo: { bio, skills: transformedSkills },
							}),
						);
					}}>
					{() => (
						<Form>
							<label>
								Biografía:
								<Field as='textarea' name='bio' />
								<ErrorMessage name='bio' component='div' />
							</label>
							<label>
								Skills - Frontend:
								<Field type='text' name='skills.frontend' />
								<ErrorMessage
									name='skills.frontend'
									component='div'
								/>
							</label>
							<label>
								Skills - Backend:
								<Field type='text' name='skills.backend' />
								<ErrorMessage
									name='skills.backend'
									component='div'
								/>
							</label>
							<label>
								Skills - Database:
								<Field type='text' name='skills.database' />
								<ErrorMessage
									name='skills.database'
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
