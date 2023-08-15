import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, deleteCategory } from '../../features/category/categorySlice';

export const DeleteCategory = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const categoryInfo = useSelector((state) => state.category?.categoryInfo);
    // Busca la categoría específica basándote en el ID
    const specificCategory = Array.isArray(categoryInfo)
        ? categoryInfo.find((cat) => cat.id.toString() === id)
        : null;

    const status = useSelector((state) => state.category.status);
    const error = useSelector((state) => state.category.error);
    const modified = useSelector((state) => state.category.modified);

    useEffect(() => {
        if (!categoryInfo) {
            dispatch(getCategory());
        }
    }, [dispatch, categoryInfo]);

    return (
        <div>
            {modified ? (
                <div>¡Eliminación realizada con éxito!</div>
            ) : (
                <>
                    {status === 'loading' && <div>Eliminando...</div>}
                    {status === 'failed' && <div>{error}</div>}
                    {!categoryInfo ? (
                        <div>
                            <p>
                                No existe información de categoría, para
                                eliminar.
                            </p>
                            <Link to='/dashboard/form-category'>Crear</Link>
                        </div>
                    ) : (
                        <div>
                            <h4>Categoría:</h4>
                            <p>{specificCategory?.name}</p>
                            <Link to={`/dashboard/update-category/${id}`}>
                                Modificar
                            </Link>
                            <button
                                onClick={() => {
                                    dispatch(deleteCategory(id));
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