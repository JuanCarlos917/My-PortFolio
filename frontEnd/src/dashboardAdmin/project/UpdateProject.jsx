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
	console.log(projectInfo);
	// Busca el proyecto específico basándote en el ID
	const specificProject = Array.isArray(projectInfo)
		? projectInfo.find((proj) => proj.id.toString() === id)
		: null;

	const status = useSelector((state) => state.project.status);
	const error = useSelector((state) => state.project.error);
	const modified = useSelector((state) => state.project.modified);

	//Traigo toda la data de teamsDev, tag y categories para que se pueda agregar quitar nuevos elementos
	const allTeams = useSelector((state) => state.teamDev.teamDevInfo);
	const allTags = useSelector((state) => state.tag.tagInfo);
	const allCategories = useSelector((state) => state.category.categoryInfo);

	// Solicita siempre la información de proyectos al cargar el componente
	useEffect(() => {
		if (status === 'idle') {
			dispatch(getProject());
			dispatch(getTeamDev());
			dispatch(getTag());
			dispatch(getCategory());
		}
	}, [status, dispatch]);

	return (
		<div>
			{modified ? (
				<div>¡Modificación realizada con éxito!</div>
			) : (
				<>
					{status === 'loading' && <div>Actualizando...</div>}
					{status === 'failed' && <div>{error}</div>}

					{!specificProject ? (
						<div>
							<p>
								No existe información de proyectos, para
								modificar.
							</p>
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
								teamDevs: specificProject.TeamDevs
									? specificProject.TeamDevs.map(
											(team) => team.id,
									)
									: [],
								tags: specificProject.Tags
									? specificProject.Tags.map((tag) => tag.id)
									: [],
								categories: specificProject.Categories
									? specificProject.Categories.map(
											(category) => category.id,
									)
									: [],
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
									<label htmlFor='description'>
										Descripción
									</label>
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
									<label htmlFor='technologies'>
										Tecnologías
									</label>
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
									<label htmlFor='teamDevs'>Equipo</label>
									<Field
										as='select'
										id='teamDevs'
										name='teamDevs'
										placeholder='Equipo del proyecto'
										multiple={true}>
										{Array.isArray(allTeams) &&
											allTeams.map((team, index) => (
												<option
													key={index}
													value={team.id}>
													{team.name}
												</option>
											))}
									</Field>
									<ErrorMessage name='teamDevs' />
								</div>
								<div>
									<label htmlFor='tags'>Tags</label>
									<Field
										as='select'
										id='tags'
										name='tags'
										placeholder='Tags del proyecto'
										multiple={true}>
										{Array.isArray(allTags) &&
											allTags.map((tag, index) => (
												<option
													key={index}
													value={tag.id}>
													{tag.name}
												</option>
											))}
									</Field>
									<ErrorMessage name='tags' />
								</div>
								<div>
									<label htmlFor='categories'>
										Categorías
									</label>
									<Field
										as='select'
										id='categories'
										name='categories'
										placeholder='Categorías del proyecto'
										multiple={true}>
										{Array.isArray(allCategories) &&
											allCategories.map(
												(category, index) => (
													<option
														key={index}
														value={category.id}>
														{category.name}
													</option>
												),
											)}
									</Field>
									<ErrorMessage name='categories' />
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
