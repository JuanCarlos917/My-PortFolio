import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTag } from '../../features/tag/tagSlice';
import { Link } from 'react-router-dom';

export const AllTags = () => {
    const dispatch = useDispatch();
    const tagInfo = useSelector((state) => state.tag.tagInfo);
    const status = useSelector((state) => state.tag.status);
    const error = useSelector((state) => state.tag.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getTag());
        }
    }, [status, dispatch]);

    let content;

    if (status === 'loading') {
        content = <div>Loading...</div>;
    } else if (status === 'succeeded') {
        if (tagInfo && Array.isArray(tagInfo)) {
            content = tagInfo.map((tag, index) => (
				<div key={index}>
					<h2>Etiqueta {index + 1}:</h2>
					<h3>Nombre:</h3>
					<p>{tag.name}</p>
					<Link to={`/dashboard/update-tag/${tag.id}`}>
						Modificar
					</Link>
					<Link to={`/dashboard/delete-tag/${tag.id}`}>Eliminar</Link>
				</div>
			));
        } else {
            content = (
                <div>
                    <p>No existe información de etiqueta, para modificar.</p>
                    <Link to='/dashboard/form-tag'>Crear</Link>
                </div>
            );
        }
    } else if (status === 'failed') {
        content = <div>{error}</div>;
    }

    return <div>{content}</div>;
}