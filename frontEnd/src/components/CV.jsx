import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCV } from '../features/cv/cvSlice';
import { AboutMe } from './AboutMe';
import { Education } from './Education';

export const Cv = () => {
	const dispatch = useDispatch();
	const cvInfo = useSelector((state) => state.cv.cvInfo);
	const status = useSelector((state) => state.cv.status);
	const error = useSelector((state) => state.cv.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getCV());
		}
	}, [status, dispatch]);

	let content;

	if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
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

				<h3>Proyectos:</h3>
				<ul>
					<li>Proyecto 1: {cvInfo?.proyects?.proyect1}</li>
					<li>Proyecto 2: {cvInfo?.proyects?.proyect2}</li>
					<li>Proyecto 3: {cvInfo?.proyects?.proyect3}</li>
					<li>Proyecto 4: {cvInfo?.proyects?.proyect4}</li>
				</ul>
				<h3>Experiencia:</h3>
				<ul>
					<li>Experiencia 1: {cvInfo?.experience?.experience1}</li>
					<li>Experiencia 2: {cvInfo?.experience?.experience2}</li>
					<li>Experiencia 3: {cvInfo?.experience?.experience3}</li>
					<li>Experiencia 4: {cvInfo?.experience?.experience4}</li>
				</ul>
				{/* Education */}
				<div>
					<Education />
				</div>
			</div>
		);
	} else if (status === 'failed') {
		content = <div> {error}</div>;
	}
	return <div>{content}</div>;
};
