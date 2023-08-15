import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamDev } from '../../features/teamDev/teamDevSlice';
import { Link } from 'react-router-dom';

export const AllTeamDevs = () => {
    const dispatch = useDispatch();
    const teamDevInfo = useSelector((state) => state.teamDev.teamDevInfo);
    const status = useSelector((state) => state.teamDev.status);
    const error = useSelector((state) => state.teamDev.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getTeamDev());
        }
    }, [status, dispatch]);

    let content;

    if (status === 'loading') {
        content = <div>Loading...</div>;
    } else if (status === 'succeeded') {
        if (teamDevInfo && Array.isArray(teamDevInfo)) {
            content = teamDevInfo.map((teamDev, index) => (
				<div key={index}>
					<h2>Miembro {index + 1}:</h2>
					<h3>Nombre:</h3>
					<p>{teamDev.name}</p>
					<h3>Email:</h3>
					<p>{teamDev.email}</p>
					<h3>Red social:</h3>
					<p>{teamDev.social_network}</p>
					<Link to={`/dashboard/update-teamDevs/${teamDev.id}`}>
						Modificar
					</Link>
					<Link to={`/dashboard/delete-teamDev/${teamDev.id}`}>
						Eliminar
					</Link>
				</div>
			));
        } else {
            content = (
                <div>
                    <p>No existe información de miembro, para modificar.</p>
                    <Link to='/dashboard/form-teamDevs'>Crear</Link>
                </div>
            );
        }
    } else if (status === 'failed') {
        content = <div>{error}</div>;
    }

    return <div>{content}</div>;
}