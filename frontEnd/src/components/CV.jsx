import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCV } from '../features/cv/cvSlice';
import { getProject } from '../features/project/projectSlice';
import { getProfessionalExp } from '../features/professionalExp/professionalExpSlice';
import { AboutMe } from './AboutMe';
import { Education } from './Education';

export const Cv = () => {
	const dispatch = useDispatch();
	const cvInfo = useSelector((state) => state.cv.cvInfo);
	const status = useSelector((state) => state.cv.status);
	const error = useSelector((state) => state.cv.error);

	const projectInfo = useSelector((state) => state.project.projectInfo);
	const statusProject = useSelector((state) => state.project.status);
	const errorProject = useSelector((state) => state.project.error);

    const professionalExpInfo = useSelector((state) => state.professionalExp.professionalExpInfo);
    const statusProfessionalExp = useSelector((state) => state.professionalExp.status);
    const errorProfessionalExp = useSelector((state) => state.professionalExp.error);



	useEffect(() => {
		if (status === 'idle') {
			dispatch(getCV());
		}
	}, [status, dispatch]);

	useEffect(() => {
		if (statusProject === 'idle') {
			dispatch(getProject());
		}
	}, [statusProject, dispatch]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getProfessionalExp());
        }
    }, [status, dispatch]);

	let content;

	if (
		status === 'loading' ||
		statusProject === 'loading' ||
		statusProfessionalExp === 'loading'
	) {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded' && statusProject === 'succeeded') {
		content = (
			<div>
				<h2>CV:</h2>
				<h3>Nombre: {cvInfo?.name}</h3>
				<h3>Apellido: {cvInfo?.lastName}</h3>
				<h3>Email: {cvInfo?.email}</h3>
				<h3>Teléfono: {cvInfo?.phone}</h3>
				<h3>Redes sociales:</h3>
				{/* About Me */}
				<div>
					<AboutMe />
				</div>
				<h3>Redes sociales</h3>
				<h4>Linkedin:</h4>
				<p>{cvInfo?.social_media?.linkedin}</p>
				<h4>Github:</h4>
				<p>{cvInfo?.social_media?.github}</p>

				{/* Projetc */}
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
							</div>
						))}
				</div>
				<div>
					{Array.isArray(professionalExpInfo) &&
						professionalExpInfo.map((experience, index) => (
							<div key={index}>
								<h2>Experiencia: {index + 1}</h2>
								<h4>Compañía: </h4>
								<p>{experience.company}</p>
								<h4>Descripción: </h4>
								<p>{experience.description}</p>
								<h4>Posición: </h4>
								<p>{experience.position}</p>
								<h4>Fecha de inicio: </h4>
								<p>{experience.startDate}</p>
								<h4>Fecha de finalización: </h4>
								<p>{experience.endDate}</p>
							</div>
						))}
				</div>

				{/* Education */}

				<div>
					<Education />
				</div>
			</div>
		);
	} else if (
		status === 'failed' ||
		errorProject === 'failed' ||
		errorProfessionalExp === 'failed'
	) {
		content = <div> {error}</div>;
	}
	return <div>{content}</div>;
};
