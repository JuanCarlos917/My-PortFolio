import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsTag from '../../utils/FormValidationsTag';
import { getTag, updateTag } from '../../features/tag/tagSlice';

export const UpdateTags = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Obtén la lista completa de etiquetas
    const tagInfo = useSelector((state) => state.tag?.tagInfo);
    // Busca la etiqueta específica basándote en el ID
    const specificTag = Array.isArray(tagInfo)
        ? tagInfo.find((tag) => tag.id.toString() === id)
        : null;

    const status = useSelector((state) => state.tag.status);
    const error = useSelector((state) => state.tag.error);
    const modified = useSelector((state) => state.tag.modified);

    // Solicita siempre la información de etiqueta al cargar el componente
    useEffect(() => {
        dispatch(getTag());
    }, [dispatch]);

    return (
        <div>
            {modified && <div>¡Modificación realizada con éxito!</div>}
            {status === 'loading' && <div>Actualizando...</div>}
            {status === 'failed' && <div>{error}</div>}
            {!specificTag ? (
                <div>
                    <p>No existe información de etiqueta, para modificar.</p>
                    <Link to='/dashboard/form-tag'>Crear</Link>
                </div>
            ) : (
                <Formik
                    initialValues={{
                        name: specificTag.name,
                    }}
                    validationSchema={FormValidationsTag}
                    onSubmit={(values) => {
                        dispatch(
                            updateTag({
                                id: id,
                                tagInfo: {
                                    name: values.name,
                                },
                            }),
                        );
                    }}>
                    {() => (
                        <Form>
                            <div>
                                <label htmlFor='name'>Nombre</label>
                                <Field
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Nombre'
                                />
                                <ErrorMessage
                                    name='name'
                                    component='div'
                                    className='error'
                                />
                            </div>
                            <button type='submit'>Actualizar</button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}