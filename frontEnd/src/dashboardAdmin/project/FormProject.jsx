import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
('react-router-dom');
import { useDispatch, useSelector } from 'react-redux';
import { createProject, getProject } from '../../features/project/projectSlice';
import { getTag } from '../../features/tag/tagSlice';
import { getCategory } from '../../features/category/categorySlice';
import { getTeamDev } from '../../features/teamDev/teamDevSlice';
import FormValidationsProject from '../../utils/FormValidationsProject';

export const FormProject = () => {
	const dispatch = useDispatch();
	const projectInfo = useSelector((state) => state.project.projectInfo);
	const status = useSelector((state) => state.project.status);
	const error = useSelector((state) => state.project.error);
	const projectAdded = useSelector((state) => state.category.projectAdded);

	const teamInfo = useSelector((state) => state.teamDev.teamDevInfo);
	const tagsInfo = useSelector((state) => state.tag.tagInfo);
	const categoriesInfo = useSelector((state) => state.category.categoryInfo);

	useEffect(() => {
		// Si no tienes la información del proyecto, la obtienes
		if (!projectInfo) {
			dispatch(getProject());
		}

		// Si no tienes la información del equipo, la obtienes
		if (!teamInfo) {
			dispatch(getTeamDev());
		}

		// Si no tienes la información de tags, la obtienes
		if (!tagsInfo) {
			dispatch(getTag());
		}

		// Si no tienes la información de categorías, la obtienes
		if (!categoriesInfo) {
			dispatch(getCategory());
		}
	}, [dispatch, projectInfo, teamInfo, tagsInfo, categoriesInfo]);

	const initialValues = {
		title: '',
		description: '',
		technologies: '',
		image: '',
		url: '',
	};
	return (
		<div>
			{projectAdded && <div>¡Proyecto agregado con éxito!</div>}
			{status === 'loading' && <div>Actualizando...</div>}
			{status === 'failed' && <div>{error}</div>}
			<Formik
				initialValues={initialValues}
				validationSchema={FormValidationsProject}

				onSubmit={(values, { setSubmitting }) => {
					// Agregar los IDs de team, tags y categories al objeto values
					values.teamDevs = Array.isArray(values.team)
                        ? values.team
                        : [values.team];
					values.tags = Array.isArray(values.tags)
						? values.tags
						: [values.tags];
					values.categories = Array.isArray(values.categories)
						? values.categories
						: [values.categories];
					dispatch(createProject(values));
					setSubmitting(false);
				}}>
				{({ isSubmitting }) => (
					<Form>
						<div>
							<label htmlFor='title'>Título</label>
							<Field type='text' name='title' />
							<ErrorMessage name='title' component='div' />
						</div>
						<div>
							<label htmlFor='description'>Descripción</label>
							<Field type='text' name='description' />
							<ErrorMessage name='description' component='div' />
						</div>
						<div>
							<label htmlFor='technologies'>Tecnologías</label>
							<Field type='text' name='technologies' />
							<ErrorMessage name='technologies' component='div' />
						</div>
						<div>
							<label htmlFor='image'>Imagen</label>
							<Field type='text' name='image' />
							<ErrorMessage name='image' component='div' />
						</div>
						<div>
							<label htmlFor='url'>URL</label>
							<Field type='text' name='url' />
							<ErrorMessage name='url' component='div' />
						</div>
						<div>
							<label htmlFor='team'>Equipo</label>
							<Field as='select' name='team'
                                multiple={true}
                            >
								{Array.isArray(teamInfo)
									? teamInfo.map((team, index) => (
											<option key={index} value={team.id}>
												{team.name}
											</option>
									))
									: null}
							</Field>
							<ErrorMessage name='team' component='div' />
						</div>
						<div>
							<label htmlFor='tags'>Tags</label>
							<Field as='select' name='tags'
                                multiple={true}
                            >
								{Array.isArray(tagsInfo)
									? tagsInfo.map((tag, index) => (
											<option key={index} value={tag.id}>
												{tag.name}
											</option>
									))
									: null}
							</Field>
							<ErrorMessage name='tags' component='div' />
						</div>
						<div>
							<label htmlFor='categories'>Categorías</label>
							<Field as='select' name='categories'
                                multiple={true}
                            >
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
							<ErrorMessage name='categories' component='div' />
						</div>
						<button type='submit' disabled={isSubmitting}>
							Enviar
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
