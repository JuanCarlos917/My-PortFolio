import { useEffect } from 'react';
import { getProfessionalExp } from '../features/professionalExp/professionalExpSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './Loading/Loading';

export const ProfessionalExp = () => {
	const dispatch = useDispatch();
	const professionalExpInfo = useSelector(
		(state) => state.professionalExp.professionalExpInfo,
	);
	const status = useSelector((state) => state.professionalExp.status);
	const error = useSelector((state) => state.professionalExp.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getProfessionalExp());
		}
	}, [status, dispatch]);

	let content;
	if (status === 'loading') {
		content = (
			<div>
				<Loading />
			</div>
		);
	} else if (status === 'succeeded') {
		content = (
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
		);
	} else if (status === 'failed') {
		content = <div> {error}</div>;
	}
	return <div>{content}</div>;
};
