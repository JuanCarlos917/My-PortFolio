import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormValidationsCV from '../../utils/FormValidationsCV';
import { Link } from 'react-router-dom';
import { getCV, updateCV } from '../../features/cv/cvSlice';
import {
	saveToLocalStorage,
	removeFromLocalStorage,
} from '../localStorageHelpers/localStorageHelpers';

export const UpdateCV = () => {
	const dispatch = useDispatch();

	const [showForm, setShowForm] = useState(true);
	const [cancelledModification, setCancelledModification] = useState(false);

	const cvInfo = useSelector((state) => state.cv.cvInfo);
	const id = useSelector((state) => state.cv.id);
	const status = useSelector((state) => state.cv.status);
	const error = useSelector((state) => state.cv.error);
	const modified = useSelector((state) => state.cv.modified);

	useEffect(() => {
		if (!cvInfo) {
			dispatch(getCV());
		}
	}, [dispatch, cvInfo]);

	useEffect(() => {
		if (modified) {
			removeFromLocalStorage('contactInfoUpdate');
			setShowForm(false); // Esconde el formulario después de una actualización exitosa
		}
	}, [modified]);

	return (
		<div>
			{modified && showForm === false ? (
				<div>
					¡Modificación realizada con éxito!
					<button onClick={() => setShowForm(true)}>Modificar</button>
				</div>
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
					{!cvInfo ? (
						<div>
							<p>No existe información de CV, para modificar.</p>
							<Link to='/dashboard/form-cv'>Crear</Link>
						</div>
					) : (
						<Formik
							initialValues={{
								name: cvInfo?.name || '',
								lastName: cvInfo?.lastName || '',
								email: cvInfo?.email || '',
								phone: cvInfo?.phone || '',
								social_media: {
									linkedin:
										cvInfo?.social_media?.linkedin || '',
									github: cvInfo?.social_media?.github || '',
								},
							}}
							validationSchema={FormValidationsCV}
							onSubmit={(values) => {
								const {
									name,
									lastName,
									email,
									phone,
									social_media,
								} = values;

								const cvInfo = {
									name,
									lastName,
									email,
									phone,
									social_media,
								};
								const userConfirmed = window.confirm(
									'¿Estás seguro de que deseas realizar la modificación?',
								);
								if (userConfirmed) {
									dispatch(
										updateCV({
											id: id,
											cvInfo
										}),
									);
								} else {
									setCancelledModification(true);
									saveToLocalStorage('contactInfoUpdate', {
										cvInfo,
									});
								}
							}}>
							{() => (
								<Form>
									<label>
										Nombre:
										<Field type='text' name='name' />
										<ErrorMessage
											name='name'
											component='div'
										/>
									</label>
									<label>
										Apellido:
										<Field type='text' name='lastName' />
										<ErrorMessage
											name='lastName'
											component='div'
										/>
									</label>
									<label>
										Email:
										<Field type='email' name='email' />
										<ErrorMessage
											name='email'
											component='div'
										/>
									</label>
									<label>
										Teléfono:
										<Field type='text' name='phone' />
										<ErrorMessage
											name='phone'
											component='div'
										/>
									</label>
									<label>
										LinkedIn:
										<Field
											type='text'
											name='social_media.linkedin'
										/>
										<ErrorMessage
											name='social_media.linkedin'
											component='div'
										/>
									</label>
									<label>
										GitHub:
										<Field
											type='text'
											name='social_media.github'
										/>
										<ErrorMessage
											name='social_media.github'
											component='div'
										/>
									</label>
									<button type='submit'>Update</button>
								</Form>
							)}
						</Formik>
					)}
				</>
			)}
		</div>
	);
};
