import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import  FormValidationsService  from '../../utils/FormValidationsService';
import { createServices } from '../../features/services/servicesSlice';

export const FormServices = () => {
	const dispatch = useDispatch();

	const status = useSelector((state) => state.services.status);
	const error = useSelector((state) => state.services.error);
	const servicesAdded = useSelector((state) => state.services.servicesAdded);

	const initialValues = {
		services: [
			{
				name: '',
				description: '',
				price: 0,
			},
		],
	};

	const onSubmit = (values) => {
		dispatch(createServices(values));
	};

	return (
		<div className='max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			{servicesAdded && (
				<div className='text-center mb-4'>
					¡Servicio agregado con éxito!
				</div>
			)}
			{status === 'loading' && (
				<div className='text-yellow-500'>Actualizando...</div>
			)}
			{status === 'failed' && <div className='text-red-500'>{error}</div>}
			<Formik
				initialValues={initialValues}
				validationSchema={FormValidationsService}
				onSubmit={onSubmit}>
				<Form>
					<label htmlFor='name'>Título</label>
					<Field type='text' name='name' placeholder='Título' />
					<ErrorMessage name='name' component='div' />
					<label htmlFor='description'>Descripción</label>
					<Field
						type='text'
						name='description'
						placeholder='Descripción'
					/>
					<ErrorMessage name='description' component='div' />
					<label htmlFor='price'>Precio</label>
					<Field type='number' name='price' placeholder='Precio' />
					<ErrorMessage name='price' component='div' />
					<button type='submit'>Agregar Servicio</button>
				</Form>
			</Formik>
		</div>
	);
};
