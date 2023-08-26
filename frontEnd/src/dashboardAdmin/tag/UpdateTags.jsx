import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsTag from '../../utils/FormValidationsTag';
import { getTag, updateTag } from '../../features/tag/tagSlice';

import {
	saveToLocalStorage,
	removeFromLocalStorage,
} from '../localStorageHelpers/localStorageHelpers';

export const UpdateTags = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(true);
	const [cancelledModification, setCancelledModification] = useState(false);

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

    useEffect(() => {
        if (modified) {
            removeFromLocalStorage('tagInfoUpdate');
            setShowForm(false); // Esconde el formulario después de una actualización exitosa
        }
    }, [modified]);

	return (
		<div>
			{modified && showForm === false ? (
				<div>¡Modificación realizada con éxito!</div>
			) : cancelledModification ? ( // Comprobar si la modificación fue cancelada
				<div>
					¡No se modificó nada!
					<button
						onClick={() => {
							setShowForm(true);
							setCancelledModification(false); // Resetear el estado al intentar de nuevo
						}}>
						Modificar de nuevo
					</button>
				</div>
			) : (
				<>
					{status === 'loading' && <div>Actualizando...</div>}
					{status === 'failed' && <div>{error}</div>}
					{!specificTag ? (
						<div>
							<p>
								No existe información de etiqueta, para
								modificar.
							</p>
							<Link to='/dashboard/form-tag'>Crear</Link>
						</div>
					) : (
						<Formik
							initialValues={{
								name: specificTag.name,
							}}
							validationSchema={FormValidationsTag}
							onSubmit={(values) => {
								// Pide confirmación al usuario
								const userConfirmed = window.confirm(
									'¿Estás seguro de que deseas realizar la modificación?',
								);
                                if(userConfirmed){
								dispatch(
									updateTag({
										id: id,
										tagInfo: {
											name: values.name,
										},
									}),
								);
                                }else {
									setCancelledModification(true);
									// Guardar el proyecto actualizado en localStorage
                                    saveToLocalStorage('tagInfoUpdate', {
										tagInfo: {
											name: values.name,
										},
									});
								}
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
				</>
			)}
		</div>
	);
};
