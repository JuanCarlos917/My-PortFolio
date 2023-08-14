import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../features/project/projectSlice';

export const ProjectList = () => {

	const dispatch = useDispatch();
	const projectInfo = useSelector((state) => state.project.projectInfo);
    console.log(projectInfo);
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
							<p>{project.image}</p>
							<h4>Url: </h4>
							<p>{project.url}</p>
                            <h4>Tecnologías: </h4>
                            <p>{project.technologies}</p>
                            <h4>Team Dev</h4>
                            <p>{project.teamDevs}</p>
                            <h4>Tags</h4>
                            <p>{project.tags}</p>
                            <h4>Categorías</h4>
                            <p>{project.categories}</p>
						</div>
					))}
			</div>
		);
	} else if (status === 'failed') {
		content = <div> {error}</div>;
	}
	return <div>{content}</div>;
};
