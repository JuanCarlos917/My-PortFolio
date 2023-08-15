import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsCategory from '../../utils/FormValidationsCategory';
import {
	getCategory,
	updateCategory,
} from '../../features/category/categorySlice';

export const UpdateCategory = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

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

	return (
		<div>
			{modified ? (
				<div>¡Modificación realizada con éxito!</div>
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
								dispatch(
									updateCategory({
										id: id,
										categoryInfo: {
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
				</>
			)}
		</div>
	);
};
