import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTag, deleteTag } from '../../features/tag/tagSlice';

export const DeleteTag = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const tagInfo = useSelector((state) => state.tag?.tagInfo);
    // Busca la etiqueta específica basándote en el ID
    const specificTag = Array.isArray(tagInfo)
        ? tagInfo.find((tag) => tag.id.toString() === id)
        : null;

    const status = useSelector((state) => state.tag.status);
    const error = useSelector((state) => state.tag.error);
    const modified = useSelector((state) => state.tag.modified);

    useEffect(() => {
        if (!tagInfo) {
            dispatch(getTag());
        }
    }, [dispatch, tagInfo]);

    return (
        <div>
            {modified ? (
                <div>¡Eliminación realizada con éxito!</div>
            ) : (
                <>
                    {status === 'loading' && <div>Eliminando...</div>}
                    {status === 'failed' && <div>{error}</div>}
                    {!tagInfo ? (
                        <div>
                            <p>
                                No existe información de etiqueta, para
                                eliminar.
                            </p>
                            <Link to='/dashboard/form-tag'>Crear</Link>
                        </div>
                    ) : (
                        <div>
                            <h4>Etiqueta:</h4>
                            <p>{specificTag?.name}</p>
                            <Link to={`/dashboard/update-tag/${id}`}>
                                Modificar
                            </Link>
                            <button
                                onClick={() => {
                                    dispatch(deleteTag(id));
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