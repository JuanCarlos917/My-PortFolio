import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionalExp } from '../../features/professionalExp/professionalExpSlice';
import { Link } from 'react-router-dom';

export const AllExperiences = () => {
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
        content = <div>Loading...</div>;
    } else if (status === 'succeeded') {
        if (professionalExpInfo && Array.isArray(professionalExpInfo)) {
            content = professionalExpInfo.map((exp, index) => (
				<div key={index}>
					<h2>Experiencia {index + 1}:</h2>
					<h3>Empresa:</h3>
					<p>{exp.company}</p>
					<h3>Puesto:</h3>
					<p>{exp.position}</p>
					<h3>Descripción:</h3>
					<p>{exp.description}</p>
					<h3>Fecha de inicio: </h3>
					<p>{exp.startDate}</p>
					<h3>Fecha de finalización:</h3>
					<p>{exp.endDate}</p>
					<Link to={`/dashboard/update-experience/${exp.id}`}>
						Modificar
					</Link>
					<Link to={`/dashboard/delete-professionalExp/${exp.id}`}>
						Eliminar
					</Link>
				</div>
			));
        } else {
            content = (
				<div>
					<p>No existe información de experiencia, para modificar.</p>
					<Link to='/dashboard/form-professionalExp'>Crear</Link>
				</div>
			);
        }
    } else if (status === 'failed') {
        content = <div>{error}</div>;
    }

    return <div>{content}</div>;
}