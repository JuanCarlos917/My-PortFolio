import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProject, deleteProject } from '../../features/project/projectSlice';

export const DeleteProject = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const projectInfo = useSelector((state) => state.project?.projectInfo);

	// Busca el proyecto específico basándote en el ID
	const specificProject = Array.isArray(projectInfo)
		? projectInfo.find((proj) => proj.id.toString() === id)
		: null;

	const status = useSelector((state) => state.project.status);
	const error = useSelector((state) => state.project.error);
	const modified = useSelector((state) => state.project.modified);

	useEffect(() => {
		if (!projectInfo) {
			dispatch(getProject());
		}
	}, [dispatch, projectInfo]);

	return (
		<div>
			{modified ? (
				<div>
					<p>¡Eliminación realizada con éxito!</p>
				</div>
			) : (
				<>
					{status === 'loading' && <div>Eliminando...</div>}
					{status === 'failed' && <div>{error}</div>}
					{!projectInfo ? (
						<div>
							<p>
								No existe información de proyectos, para
								eliminar.
							</p>
							<Link to='/dashboard/form-project'>Crear</Link>
						</div>
					) : (
						<div>
							<h4>Título:</h4>
							<p>{specificProject?.title}</p>
							<h4>Descripción:</h4>
							<p>{specificProject?.description}</p>
							<h4>Tecnologías:</h4>
							<p>{specificProject?.technologies}</p>
							<h4>URL:</h4>
							<p>{specificProject?.url}</p>
							<h4>Imagen:</h4>
							<p>{specificProject?.image}</p>
							<h4>Equipo de desarrollo:</h4>
							<ul>
								{Array.isArray(specificProject.TeamDevs) &&
									specificProject.TeamDevs.map(
										(team, teamIndex) => (
											<li key={teamIndex}>{team.name}</li>
										),
									)}
							</ul>
							<h3>Tags:</h3>
							<ul>
								{Array.isArray(specificProject.Tags) &&
									specificProject.Tags.map(
										(tag, tagIndex) => (
											<li key={tagIndex}>{tag.name}</li>
										),
									)}
							</ul>
							<h3>Categorías:</h3>
							<ul>
								{Array.isArray(specificProject.Categories) &&
									specificProject.Categories.map(
										(category, categoryIndex) => (
											<li key={categoryIndex}>
												{category.name}
											</li>
										),
									)}
							</ul>
							<button
								onClick={() => {
									dispatch(deleteProject(id));
								}}>
								Eliminar
							</button>
							<Link to={`/dashboard/update-projects/${id}`}>
								Modificar
							</Link>
						</div>
					)}
				</>
			)}
		</div>
	);
};
