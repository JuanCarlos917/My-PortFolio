import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamDev, deleteTeamDev } from '../../features/teamDev/teamDevSlice';

export const DeleteTeamDevs = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const teamDevInfo = useSelector((state) => state.teamDev?.teamDevInfo);
    // Busca la etiqueta específica basándote en el ID
    const specificTeamDev = Array.isArray(teamDevInfo)
        ? teamDevInfo.find((teamDev) => teamDev.id.toString() === id)
        : null;

    const status = useSelector((state) => state.teamDev.status);
    const error = useSelector((state) => state.teamDev.error);
    const modified = useSelector((state) => state.teamDev.modified);

    useEffect(() => {
        if (!teamDevInfo) {
            dispatch(getTeamDev());
        }
    }, [dispatch, teamDevInfo]);

    return (
        <div>
            {modified ? (
                <div>¡Eliminación realizada con éxito!</div>
            ) : (
                <>
                    {status === 'loading' && <div>Eliminando...</div>}
                    {status === 'failed' && <div>{error}</div>}
                    {!teamDevInfo ? (
                        <div>
                            <p>
                                No existe información de miembro, para
                                eliminar.
                            </p>
                            <Link to='/dashboard/form-teamDevs'>Crear</Link>
                        </div>
                    ) : (
                        <div>
                            <h4>Miembro:</h4>
                            <h4>{specificTeamDev?.name}</h4>
                            <p>{specificTeamDev?.email}</p>
                            <p>{specificTeamDev?.social_network}</p>
                            <Link to={`/dashboard/update-teamDevs/${id}`}>
                                Modificar
                            </Link>
                            <button
                                onClick={() => {
                                    dispatch(deleteTeamDev(id));
                                }}>
                                Eliminar
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}