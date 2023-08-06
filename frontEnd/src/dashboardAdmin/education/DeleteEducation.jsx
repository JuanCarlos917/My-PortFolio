import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getEducation,
    deleteEducation,
} from '../../features/education/educationSlice';

export const DeleteEducation = () => {
    const dispatch = useDispatch();
    const educationInfo = useSelector((state) => state.education?.educationInfo);
    const id = useSelector((state) => state.education.id);
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
            {modified && <div>¡Eliminación realizada con éxito!</div>}
            {status === 'loading' && <div>Eliminando...</div>}
            {status === 'failed' && <div>{error}</div>}
            {!educationInfo ? (
                <div>
                    <p>No existe información de educación, para eliminar.</p>
                    <Link to='/dashboard/form-education'>Crear</Link>
                </div>
            ) : (
                <div>
                    <p>{educationInfo?.degree}</p>
                    <p>{educationInfo?.description}</p>
                    <p>{educationInfo?.institution}</p>
                    <p>{educationInfo?.field_of_study}</p>
                    <p>{educationInfo?.startDate}</p>
                    <p>{educationInfo?.endDate}</p>
                    <button
                        onClick={() => {
                            dispatch(deleteEducation(id));
                        }}>
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}