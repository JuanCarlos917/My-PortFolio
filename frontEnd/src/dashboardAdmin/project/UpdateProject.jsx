import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsProject from '../../utils/FormValidationsProject';
import { getProject, updateProject } from '../../features/project/projectSlice';

import { getTag } from '../../features/tag/tagSlice';
import { getCategory } from '../../features/category/categorySlice';
import { getTeamDev } from '../../features/teamDev/teamDevSlice';

export const UpdateProjects = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	// Obtén la lista completa de proyectos
	const projectInfo = useSelector((state) => state.project?.projectInfo);
	// Busca el proyecto específico basándote en el ID
	const specificProject = Array.isArray(projectInfo)
		? projectInfo.find((proj) => proj.id.toString() === id)
		: null;

	const status = useSelector((state) => state.project.status);
	const error = useSelector((state) => state.project.error);
	const modified = useSelector((state) => state.project.modified);

	const teamInfo = useSelector((state) => state.teamDev.teamDevInfo);
	const tagsInfo = useSelector((state) => state.tag.tagInfo);
	const categoriesInfo = useSelector((state) => state.category.categoryInfo);

	// Solicita siempre la información de proyectos al cargar el componente
	useEffect(() => {
		if (status === 'idle') {
			dispatch(getProject());
			dispatch(getTag());
			dispatch(getCategory());
			dispatch(getTeamDev());
		}
	}, [status, dispatch]);

	return (
		<div>
			{modified && <div>¡Modificación realizada con éxito!</div>}
			{status === 'loading' && <div>Actualizando...</div>}
			{status === 'failed' && <div>{error}</div>}
			{!specificProject ? (
				<div>
					<p>No existe información de proyectos, para modificar.</p>
					<Link to='/dashboard/form-project'>Crear</Link>
				</div>
			) : (
				<Formik
					initialValues={{
						title: specificProject.title,
						description: specificProject.description,
						technologies: specificProject.technologies,
						url: specificProject.url,
						image: specificProject.image,
						teamDevs: specificProject.teamDevs || [],
						categories: specificProject.categories || [],
						tags: specificProject.tags || [],
					}}
					validationSchema={FormValidationsProject}
					onSubmit={(values) => {
						dispatch(
							updateProject({
								id: id,
								projectInfo: {
									title: values.title,
									description: values.description,
									technologies: values.technologies,
									url: values.url,
									image: values.image,
									teamDevs: values.teamDevs,
									categories: values.categories,
									tags: values.tags,
								},
							}),
						);
					}}>
					<Form>
						<div>
							<label htmlFor='title'>Título</label>
							<Field
								type='text'
								id='title'
								name='title'
								placeholder='Título del proyecto'
							/>
							<ErrorMessage name='title' />
						</div>
						<div>
							<label htmlFor='description'>Descripción</label>
							<Field
								type='text'
								id='description'
								name='description'
								placeholder='Descripción del proyecto'
							/>
							<ErrorMessage name='description' />
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}>
							<label htmlFor='technologies'>Tecnologías</label>
							<Field
								type='text'
								id='technologies'
								name='technologies'
								placeholder='Tecnologías utilizadas'
							/>
							<ErrorMessage name='technologies' />
						</div>
						<div>
							<label htmlFor='url'>URL</label>
							<Field
								type='text'
								id='url'
								name='url'
								placeholder='URL del proyecto'
							/>
							<ErrorMessage name='url' />
						</div>
						<div>
							<label htmlFor='image'>Imagen</label>
							<Field
								type='text'
								id='image'
								name='image'
								placeholder='Imagen del proyecto'
							/>
							<ErrorMessage name='image' />
						</div>
						<div>
							<label htmlFor='team'>Equipo</label>
							<Field
								as='select'
								id='team'
								name='team'
								placeholder='Equipo del proyecto'
								multiple={true}>
								{Array.isArray(teamInfo)
									? teamInfo.map((team, index) => (
											<option key={index} value={team.id}>
												{team.name}
											</option>
								))
									: null}
							</Field>
							<ErrorMessage name='team' />
						</div>
						<div>
							<label htmlFor='tags'>Tags</label>
							<Field
								as='select'
								id='tags'
								name='tags'
								placeholder='Tags del proyecto'
								multiple={true}>
								{Array.isArray(tagsInfo)
									? tagsInfo.map((tag, index) => (
											<option key={index} value={tag.id}>
												{tag.name}
											</option>
								))
									: null}
							</Field>
							<ErrorMessage name='tags' />
						</div>
						<div>
							<label htmlFor='categories'>Categorías</label>
							<Field
								as='select'
								id='categories'
								name='categories'
								placeholder='Categorías del proyecto'
								multiple={true}>
								{Array.isArray(categoriesInfo)
									? categoriesInfo.map((category, index) => (
											<option
												key={index}
												value={category.id}>
												{category.name}
											</option>
								))
									: null}
							</Field>
							<ErrorMessage name='categories' />
						</div>
						<button type='submit'>Actualizar</button>
					</Form>
				</Formik>
			)}
		</div>
	);
};
