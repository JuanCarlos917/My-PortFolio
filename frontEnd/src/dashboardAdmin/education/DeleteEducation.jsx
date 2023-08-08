import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getEducation,
	deleteEducation,
} from '../../features/education/educationSlice';

export const DeleteEducation = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const educationInfo = useSelector(
		(state) => state.education?.educationInfo,
	);
	// Busca la educación específica basándote en el ID
	const specificEducation = Array.isArray(educationInfo)
		? educationInfo.find((edu) => edu.id.toString() === id)
		: null;

	const status = useSelector((state) => state.education.status);
	const error = useSelector((state) => state.education.error);
	const modified = useSelector((state) => state.education.modified);

	useEffect(() => {
		if (!educationInfo) {
			dispatch(getEducation());
		}
	}, [dispatch, educationInfo]);

	return (
		<div>
			{modified ? (
				<div>¡Eliminación realizada con éxito!</div>
			) : (
				<>
					{status === 'loading' && <div>Eliminando...</div>}
					{status === 'failed' && <div>{error}</div>}
					{!educationInfo ? (
						<div>
							<p>
								No existe información de educación, para
								eliminar.
							</p>
							<Link to='/dashboard/form-education'>Crear</Link>
						</div>
					) : (
						<div>
							<h4>Carrera:</h4>
							<p>{specificEducation?.degree}</p>
							<h4>Descripción:</h4>
							<p>{specificEducation?.description}</p>
							<h4>Universidad:</h4>
							<p>{specificEducation?.institution}</p>
							<h4>Campo de estudio:</h4>
							<p>{specificEducation?.field_of_study}</p>
							<h4>Fecha de inicio:</h4>
							<p>{specificEducation?.startDate}</p>
							<h4>Fecha de finalización:</h4>
							<p>{specificEducation?.endDate}</p>
							<button
								onClick={() => {
									dispatch(deleteEducation(id));
								}}>
								Eliminar
							</button>
							<Link to={`/dashboard/update-education/${id}`}>
								Modificar
							</Link>
						</div>
					)}
				</>
			)}
		</div>
	);

};
