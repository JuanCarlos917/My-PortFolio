import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../features/category/categorySlice';
import { Link } from 'react-router-dom';

export const AllCategories = () => {
    const dispatch = useDispatch();
    const categoryInfo = useSelector((state) => state.category.categoryInfo);
    const status = useSelector((state) => state.category.status);
    const error = useSelector((state) => state.category.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getCategory());
        }
    }, [status, dispatch]);

    let content;

    if (status === 'loading') {
        content = <div>Loading...</div>;
    } else if (status === 'succeeded') {
        if (categoryInfo && Array.isArray(categoryInfo)) {
            content = categoryInfo.map((category, index) => (
                <div key={index}>
                    <h2>Categoría {index + 1}:</h2>
                    <h3>Nombre:</h3>
                    <p>{category.name}</p>
                    <Link to={`/dashboard/update-category/${category.id}`}>
                        Modificar
                    </Link>
                    <Link to={`/dashboard/delete-category/${category.id}`}>
                        Eliminar
                    </Link>
                </div>
            ));
        } else {
            content = (
                <div>
                    <p>No existe información de categoría, para modificar.</p>
                    <Link to='/dashboard/form-category'>Crear</Link>
                </div>
            );
        }
    } else if (status === 'failed') {
        content = <div>{error}</div>;
    }

    return <div>{content}</div>;
}
