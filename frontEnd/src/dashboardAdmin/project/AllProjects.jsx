import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../../features/project/projectSlice';


export const AllProjects = () => {
	const dispatch = useDispatch();
	const projectInfo = useSelector((state) => state.project.projectInfo);
	const status = useSelector((state) => state.project.status);
	const error = useSelector((state) => state.project.error);


	useEffect(() => {
		if (status === 'idle') {
			dispatch(getProject());
		}
	}, [status, dispatch]);


	let content;

	if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		if (projectInfo && Array.isArray(projectInfo)) {
			content = projectInfo.map((project, index) => (
				<div key={index}>
					<h2>Proyecto {index + 1}:</h2>
					<h3>Título:</h3>
					<p>{project.title}</p>
					<h3>Descripción:</h3>
					<p>{project.description}</p>
					<h3>Tecnologías:</h3>
					<p>{project.technologies}</p>
					<h3>Imagen:</h3>
					<p>{project.image}</p>
					<h3>URL:</h3>
					<p>{project.url}</p>
					<h3>Equipo:</h3>
					<ul>
						{Array.isArray(project.TeamDevs) &&
							project.TeamDevs.map((team, teamIndex) => (
								<li key={teamIndex}>{team.name}</li>
							))}
					</ul>
					<h3>Tags:</h3>
					<ul>
						{Array.isArray(project.Tags) &&
							project.Tags.map((tag, tagIndex) => (
								<li key={tagIndex}>{tag.name}</li>
							))}
					</ul>
					<h3>Categorías:</h3>
					<ul>
						{Array.isArray(project.Categories) &&
							project.Categories.map(
								(category, categoryIndex) => (
									<li key={categoryIndex}>{category.name}</li>
								),
							)}
					</ul>

					<Link to={`/dashboard/update-projects/${project.id}`}>
						Modificar
					</Link>
					<Link to={`/dashboard/delete-project/${project.id}`}>
						Eliminar
					</Link>
				</div>
			));
		} else {
			content = (
				<div>
					<p>No existe información de proyectos, para modificar.</p>
					<Link to='/dashboard/form-project'>Crear</Link>
				</div>
			);
		}
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return <div>{content}</div>;
};
