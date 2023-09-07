import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormValidationsEduca from '../../utils/FormValidationsEduca';
import { useDispatch, useSelector } from 'react-redux';
import {
	createEducation,
	getEducation,
} from '../../features/education/educationSlice';
export const FormEducation = () => {
	const dispatch = useDispatch();
	const educationInfo = useSelector(
		(state) => state.education?.educationInfo,
	);

	const status = useSelector((state) => state.education.status);
	const error = useSelector((state) => state.education.error);
	const educationAdded = useSelector(
		(state) => state.education.educationAdded,
	);

	useEffect(() => {
		if (!educationInfo) {
			dispatch(getEducation());
		}
	}, [dispatch, educationInfo]);

	const initialValues = {
		educations: [
			{
				degree: '',
				description: '',
				institution: '',
				field_of_study: '',
				startDate: '',
				endDate: '',
			},
		],
	};
	return (
		<div className='max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			{educationAdded && (
				<div className='text-center mb-4'>
					¡Educación agregada con éxito!
				</div>
			)}
			{status === 'loading' && (
				<div className='text-yellow-500'>Actualizando...</div>
			)}
			{status === 'failed' && <div className='text-red-500'>{error}</div>}
			<Formik
				initialValues={initialValues}
				validationSchema={FormValidationsEduca}
				onSubmit={(values, { setSubmitting }) => {
					dispatch(createEducation(values));
					setSubmitting(false);
				}}>
				{({ isSubmitting }) => (
					<Form>
						<label
							htmlFor='degree'
							className='block text-sm font-medium text-gray-600'>
							Grado
						</label>
						<Field
							type='text'
							name='degree'
							className='mt-1 p-2 w-full border rounded-md'
						/>
						<ErrorMessage name='degree' component='div' />
						<label
							htmlFor='description'
							className='block text-sm font-medium text-gray-600'>
							Descripción
						</label>
						<Field
							as='textarea'
							name='description'
							className='mt-1 p-2 w-full border rounded-md min-h-[9rem]'
						/>
						<ErrorMessage name='description' component='div' />
						<label
							htmlFor='institution'
							className='block text-sm font-medium text-gray-600'>
							Institución
						</label>
						<Field
							type='text'
							name='institution'
							className='mt-1 p-2 w-full border rounded-md'
						/>
						<ErrorMessage name='institution' component='div' />
						<label
							htmlFor='field_of_study'
							className='block text-sm font-medium text-gray-600'>
							Campo de estudio
						</label>
						<Field
							type='text'
							name='field_of_study'
							className='mt-1 p-2 w-full border rounded-md'
						/>
						<ErrorMessage name='field_of_study' component='div' />
						<label
							htmlFor='startDate'
							className='block text-sm font-medium text-gray-600'>
							Fecha de inicio
						</label>
						<Field
							type='date'
							name='startDate'
							className='mt-1 p-2 w-full border rounded-md'
						/>
						<ErrorMessage name='startDate' component='div' />
						<label
							htmlFor='endDate'
							className='block text-sm font-medium text-gray-600'>
							Fecha de finalización
						</label>
						<Field
							type='date'
							name='endDate'
							className='mt-1 p-2 w-full border rounded-md'
						/>
						<ErrorMessage name='endDate' component='div' />
						<div className='text-center'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
								Enviar
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
