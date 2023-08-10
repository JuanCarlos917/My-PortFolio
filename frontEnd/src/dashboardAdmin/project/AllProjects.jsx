import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../../features/project/projectSlice';

import { getTag } from '../../features/tag/tagSlice';
import { getCategory } from '../../features/category/categorySlice';
import { getTeamDev } from '../../features/teamDev/teamDevSlice';

export const AllProjects = () => {
	const dispatch = useDispatch();
	const projectInfo = useSelector((state) => state.project.projectInfo);
	const status = useSelector((state) => state.project.status);
	const error = useSelector((state) => state.project.error);

	const teamInfo = useSelector((state) => state.teamDev.teamDevInfo);
	const tagsInfo = useSelector((state) => state.tag.tagInfo);
	const categoriesInfo = useSelector((state) => state.category.categoryInfo);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getProject());
		}
        if (status === 'idle') {
			dispatch(getTag());
		}
        if (status === 'idle') {
            dispatch(getCategory());
        }
        if (status === 'idle') {
            dispatch(getTeamDev());
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
					<p>
						{Array.isArray(teamInfo)
							? teamInfo.map((team, index) => (
									<option key={index} value={team.id}>
										{team.name}
									</option>
							))
							: null}
					</p>
					<h3>Tags:</h3>
					<p>
                        {Array.isArray(tagsInfo)
                            ? tagsInfo.map((tag, index) => (
                                    <option key={index} value={tag.id}>
                                        {tag.name}
                                    </option>
                            ))
                            : null}
                    </p>
					<h3>Categorías:</h3>
					<p>
                        {Array.isArray(categoriesInfo)
                            ? categoriesInfo.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                            ))
                            : null}
                    </p>

					<Link to={`/dashboard/update-project/${project.id}`}>
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
