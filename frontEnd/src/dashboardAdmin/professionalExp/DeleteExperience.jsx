import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProfessionalExp,
	deleteProfessionalExp,
} from '../../features/professionalExp/professionalExpSlice';

export const DeleteExperience = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const professionalExpInfo = useSelector(
		(state) => state.professionalExp?.professionalExpInfo,
	);
	// Busca la experiencia específica basándote en el ID
	const specificProfessionalExp = Array.isArray(professionalExpInfo)
		? professionalExpInfo.find((exp) => exp.id.toString() === id)
		: null;

	const status = useSelector((state) => state.professionalExp.status);
	const error = useSelector((state) => state.professionalExp.error);
	const modified = useSelector((state) => state.professionalExp.modified);

	useEffect(() => {
		if (!professionalExpInfo) {
			dispatch(getProfessionalExp());
		}
	}, [dispatch, professionalExpInfo]);

	return (
		<div>
			{modified ? (
				<div>¡Eliminación realizada con éxito!</div>
			) : (
				<>
					{status === 'loading' && <div>Eliminando...</div>}
					{status === 'failed' && <div>{error}</div>}

					{!professionalExpInfo ? (
						<div>
							<p>
								No existe información de experiencia, para
								eliminar.
							</p>
							<Link to='/dashboard/form-experience'>Crear</Link>
						</div>
					) : (
						<div>
							<h4>Empresa:</h4>
							<p>{specificProfessionalExp?.company}</p>
							<h4>Puesto:</h4>
							<p>{specificProfessionalExp?.position}</p>
							<h4>Descripción:</h4>
							<p>{specificProfessionalExp?.description}</p>
							<h4>Fecha de inicio:</h4>
							<p>{specificProfessionalExp?.startDate}</p>
							<h4>Fecha de finalización:</h4>
							<p>{specificProfessionalExp?.endDate}</p>
							<button
								onClick={() => {
									dispatch(deleteProfessionalExp(id));
								}}>
								Eliminar
							</button>
							<Link
								to={`/dashboard/update-experience/${id}`}>
								Modificar
							</Link>
						</div>
					)}
				</>
			)}
		</div>
	);
};
