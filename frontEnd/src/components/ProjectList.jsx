import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../features/project/projectSlice';

export const ProjectList = () => {

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
		content = (
			<div>
				{Array.isArray(projectInfo) &&
					projectInfo.map((project, index) => (
						<div key={index}>
							<h2>Proyecto: {index + 1}</h2>
							<h4>Nombre: </h4>
							<p>{project.title}</p>
							<h4>Descripción: </h4>
							<p>{project.description}</p>
							<h4>Imagen: </h4>
							<img src={project.image} alt={project.title} />
							<h4>Url: </h4>
							<a href={project.url}>{project.title}</a>
							<h4>Tecnologías: </h4>
							<p>{project.technologies}</p>
							<h3>Equipo:</h3>
							<ul>
								{Array.isArray(project.TeamDevs) &&
									project.TeamDevs.map((team, teamIndex) => (
										<li key={teamIndex}>
											{team.name}
											{team.social_network && (
												<a
													href={team.social_network}
													target='_blank'
													rel='noopener noreferrer'>
													Linkedin
												</a>
											)}
										</li>
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
											<li key={categoryIndex}>
												{category.name}
											</li>
										),
									)}
							</ul>
						</div>
					))}
			</div>
		);
	} else if (status === 'failed') {
		content = <div> {error}</div>;
	}
	return <div>{content}</div>;
};
