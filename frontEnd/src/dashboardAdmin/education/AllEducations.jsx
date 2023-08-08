import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEducation } from '../../features/education/educationSlice';
import { Link } from 'react-router-dom';

export const AllEducations = () => {
	const dispatch = useDispatch();
	const educationInfo = useSelector((state) => state.education.educationInfo);
	const status = useSelector((state) => state.education.status);
	const error = useSelector((state) => state.education.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getEducation());
		}
	}, [status, dispatch]);

	let content;

	if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		if (educationInfo && Array.isArray(educationInfo)) {
			content = educationInfo.map((edu, index) => (
				<div key={index}>
					<h2>Educación {index + 1}:</h2>
					<h3>Universidad:</h3>
					<p>{edu.institution}</p>
					<h3>Carrera:</h3>
					<p>{edu.degree}</p>
					<h3>Campo de estudio:</h3>
					<p>{edu.field_of_study}</p>
					<h3>Descripción:</h3>
					<p>{edu.description}</p>
					<h3>Fecha de inicio: </h3>
					<p>{edu.startDate}</p>
					<h3>Fecha de finalización:</h3>
					<p>{edu.endDate}</p>
					<Link to={`/dashboard/update-education/${edu.id}`}>
						Modificar
					</Link>
					<Link to={`/dashboard/delete-education/${edu.id}`}>
						Eliminar
					</Link>
				</div>
			));
		} else {
			content = (
				<div>
					<p>No existe información de educación, para modificar.</p>
					<Link to='/dashboard/form-education'>Crear</Link>
				</div>
			);
		}
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return <div>{content}</div>;
};
