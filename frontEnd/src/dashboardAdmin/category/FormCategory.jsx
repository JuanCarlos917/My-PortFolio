import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCategory,
	createCategory,
} from '../../features/category/categorySlice';
import FormValidationsCategory from '../../utils/FormValidationsCategory';

export const FormCategory = () => {
	const dispatch = useDispatch();
	const categoryInfo = useSelector((state) => state.category.categoryInfo);
	const status = useSelector((state) => state.category.status);
	const error = useSelector((state) => state.category.error);
	const categoryAdded = useSelector((state) => state.category.categoryAdded);
	const [errorMsg, setErrorMsg] = useState('');
	const [shouldReloadCategories, setShouldReloadCategories] = useState(false);

	useEffect(() => {
		if (!categoryInfo || shouldReloadCategories) {
			dispatch(getCategory());
			setShouldReloadCategories(false); // Reseteamos después de cargar
		}
	}, [dispatch, categoryInfo, shouldReloadCategories]);

	useEffect(() => {
		if (categoryAdded) {
			dispatch(getCategory());
		}
	}, [dispatch, categoryAdded]);

	return (
		<div>
			{categoryAdded && <div>¡Categoría agregada con éxito!</div>}
			{status === 'loading' && <div>Actualizando...</div>}
			{status === 'failed' && <div>{error}</div>}
			{errorMsg && <div>{errorMsg}</div>}
			<Formik
				initialValues={{ name: '' }}
				validationSchema={FormValidationsCategory}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					const categoryExists = categoryInfo?.some(
						(category) => category.name === values.name,
					);

					setSubmitting(true);

					if (categoryExists) {
						setErrorMsg('¡La categoría con ese nombre ya existe!');
						setSubmitting(false);
					} else {
						dispatch(createCategory(values));
						setErrorMsg('');
						resetForm();
						setShouldReloadCategories(true);
						setSubmitting(false);
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor='name'>Nombre</label>
						<Field type='text' name='name' />
						<ErrorMessage name='name' component='div' />
						<button type='submit' disabled={isSubmitting}>
							Enviar
						</button>
					</Form>
				)}
			</Formik>

			<div>
				<h2>Categorías Creadas</h2>
				<ul>
					{Array.isArray(categoryInfo)
						? categoryInfo.map((category) => (
								<li key={category.id}>{category.name}</li>
						))
						: null}
				</ul>
			</div>
		</div>
	);
};
