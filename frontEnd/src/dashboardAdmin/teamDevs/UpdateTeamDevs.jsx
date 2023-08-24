import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormValidationsTeamDev from '../../utils/FormValidationsTeamDev';
import { getTeamDev, updateTeamDev } from '../../features/teamDev/teamDevSlice';

import {
	saveToLocalStorage,
	removeFromLocalStorage,
} from '../localStorageHelpers/localStorageHelpers';

export const UpdateTeamDevs = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(true);
	const [cancelledModification, setCancelledModification] = useState(false);

	// Obtén la lista completa de miembros
	const teamDevInfo = useSelector((state) => state.teamDev?.teamDevInfo);
	// Busca el miembro específico basándote en el ID
	const specificTeamDev = Array.isArray(teamDevInfo)
		? teamDevInfo.find((teamDev) => teamDev.id.toString() === id)
		: null;

	const status = useSelector((state) => state.teamDev.status);
	const error = useSelector((state) => state.teamDev.error);
	const modified = useSelector((state) => state.teamDev.modified);

	// Solicita siempre la información de miembro al cargar el componente
	useEffect(() => {
		dispatch(getTeamDev());
	}, [dispatch]);

    useEffect(() => {
        if (modified) {
            removeFromLocalStorage('teamDevInfoUpdate');
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
					{!specificTeamDev ? (
						<div>
							<p>
								No existe información de miembro, para
								modificar.
							</p>
							<Link to='/dashboard/form-teamDevs'>Crear</Link>
						</div>
					) : (
						<Formik
							initialValues={{
								name: specificTeamDev.name,
								email: specificTeamDev.email,
								social_network: specificTeamDev.social_network,
							}}
							validationSchema={FormValidationsTeamDev}
							onSubmit={(values) => {
								// Pide confirmación al usuario
								const userConfirmed = window.confirm(
									'¿Estás seguro de que deseas realizar la modificación?',
								);
                                if(userConfirmed) {
								dispatch(
									updateTeamDev({
										id: id,
										teamDevInfo: {
											name: values.name,
											email: values.email,
											social_network:
												values.social_network,
										},
									}),
								);
                                }else{
									setCancelledModification(true);
									// Guardar el proyecto actualizado en localStorage
                                    saveToLocalStorage('teamDevInfoUpdate', {
										teamDevInfo: {
											name: values.name,
											email: values.email,
											social_network:
												values.social_network,
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
											placeholder='Nombre'
										/>
										<ErrorMessage name='name' />
									</div>
									<div>
										<label htmlFor='email'>Email</label>
										<Field
											type='text'
											name='email'
											placeholder='Email'
										/>
										<ErrorMessage name='email' />
									</div>
									<div>
										<label htmlFor='social_network'>
											Red Social
										</label>
										<Field
											type='text'
											name='social_network'
											placeholder='Red Social'
										/>
										<ErrorMessage name='social_network' />
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
