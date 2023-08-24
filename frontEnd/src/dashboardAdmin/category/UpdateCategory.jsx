import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsCategory from '../../utils/FormValidationsCategory';

import {
	getCategory,
	updateCategory,
} from '../../features/category/categorySlice';

import {
	saveToLocalStorage,
	removeFromLocalStorage,
} from '../localStorageHelpers/localStorageHelpers';

export const UpdateCategory = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(true);
	const [cancelledModification, setCancelledModification] = useState(false);

	// Obtén la lista completa de categorías
	const categoryInfo = useSelector((state) => state.category?.categoryInfo);
	// Busca la categoría específica basándote en el ID
	const specificCategory = Array.isArray(categoryInfo)
		? categoryInfo.find((category) => category.id.toString() === id)
		: null;

	const status = useSelector((state) => state.category.status);
	const error = useSelector((state) => state.category.error);
	const modified = useSelector((state) => state.category.modified);

	// Solicita siempre la información de categoría al cargar el componente
	useEffect(() => {
		dispatch(getCategory());
	}, [dispatch]);

    useEffect(() => {
		if (modified) {
			removeFromLocalStorage('categoryInfoUpdate');
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
					{!specificCategory ? (
						<div>
							<p>
								No existe información de categoría, para
								modificar.
							</p>
							<Link to='/dashboard/form-category'>Crear</Link>
						</div>
					) : (
						<Formik
							initialValues={{
								name: specificCategory.name,
							}}
							validationSchema={FormValidationsCategory}
							onSubmit={(values) => {
								// Pide confirmación al usuario
								const userConfirmed = window.confirm(
									'¿Estás seguro de que deseas realizar la modificación?',
								);
                                if(userConfirmed) {
								dispatch(
									updateCategory({
										id: id,
										categoryInfo: {
											name: values.name,
										},
									}),
								);
                                }else {
									setCancelledModification(true);
									// Guardar el proyecto actualizado en localStorage
                                    saveToLocalStorage('categoryInfoUpdate', {
										categoryInfo: {
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
