import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
    getTag,
    createTag,
} from '../../features/tag/tagSlice';
import FormValidationsTag from '../../utils/FormValidationsTag';

export const FormTag = () => {
    const dispatch = useDispatch();
    const tagInfo = useSelector((state) => state.tag.tagInfo);
    const status = useSelector((state) => state.tag.status);
    const error = useSelector((state) => state.tag.error);
    const tagAdded = useSelector((state) => state.tag.tagAdded);
    const [errorMsg, setErrorMsg] = useState('');
    const [shouldReloadTags, setShouldReloadTags] = useState(false);

    useEffect(() => {
        if (!tagInfo || shouldReloadTags) {
            dispatch(getTag());
            setShouldReloadTags(false); // Reseteamos después de cargar
        }
    }, [dispatch, tagInfo, shouldReloadTags]);

    useEffect(() => {
        if (tagAdded) {
            dispatch(getTag());
        }
    }, [dispatch, tagAdded]);

    return (
		<div>
			{tagAdded && <div>¡Etiqueta agregada con éxito!</div>}
			{status === 'loading' && <div>Actualizando...</div>}
			{status === 'failed' && <div>{error}</div>}
			{errorMsg && <div>{errorMsg}</div>}
			<Formik
				initialValues={{ name: '' }}
				validationSchema={FormValidationsTag}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					const tagExists = tagInfo?.some(
						(tag) => tag.name === values.name,
					);

					setSubmitting(true);

					if (tagExists) {
						setErrorMsg('¡La etiqueta con ese nombre ya existe!');
						setSubmitting(false);
					} else {
						dispatch(createTag(values));
						setErrorMsg('');
						resetForm();
						setShouldReloadTags(true);
						setSubmitting(false);
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor='name'>Nombre</label>
						<Field type='text' name='name' />
						<ErrorMessage name='name' component='div' />
						<button type='submit' disabled={isSubmitting}>
							Agregar
						</button>
					</Form>
				)}
			</Formik>
            <div>
                <h3>Etiquetas</h3>
                <ul>
                    {Array.isArray(tagInfo)? tagInfo.map((tag)=> (
                        <li key={tag.id}>{tag.name}</li>
                    )): null}
                </ul>
            </div>
		</div>
	);
}