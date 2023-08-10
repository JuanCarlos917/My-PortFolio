import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
        getTeamDev,
        createTeamDev
} from '../../features/teamDev/teamDevSlice';
import FormValidationsTeamDev from '../../utils/FormValidationsTeamDev';

export const FormTeamDevs = () => {

    const dispatch = useDispatch();
    const teamDevInfo = useSelector((state) => state.teamDev.teamDevInfo);
    const status = useSelector((state) => state.teamDev.status);
    const error = useSelector((state) => state.teamDev.error);
    const teamDevAdded = useSelector((state) => state.teamDev.teamDevAdded);
    const [errorMsg, setErrorMsg] = useState('');
    const [shouldReloadTeamDevs, setShouldReloadTeamDevs] = useState(false);

    useEffect(() => {
        if (!teamDevInfo || shouldReloadTeamDevs) {
            dispatch(getTeamDev());
            setShouldReloadTeamDevs(false); // Reseteamos después de cargar
        }
    }
    , [dispatch, teamDevInfo, shouldReloadTeamDevs]);

    useEffect(() => {
        if (teamDevAdded) {
            dispatch(getTeamDev());
        }
    }
    , [dispatch, teamDevAdded]);

    return (
        <div>
            {teamDevAdded && <div>¡Miembro agregado con éxito!</div>}
            {status === 'loading' && <div>Actualizando...</div>}
            {status === 'failed' && <div>{error}</div>}
            {errorMsg && <div>{errorMsg}</div>}
            <Formik
                initialValues={{ name: '', email: '', social_network: '' }}
                validationSchema={FormValidationsTeamDev}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const teamDevExists = teamDevInfo?.some(
                        (teamDev) => teamDev.name === values.name,

                    );

                    setSubmitting(true);

                    if (teamDevExists) {
                        setErrorMsg('¡El miembro con ese nombre ya existe!');
                        setSubmitting(false);
                    } else {
                        dispatch(createTeamDev(values));
                        setErrorMsg('');
                        resetForm();
                        setShouldReloadTeamDevs(true);
                        setSubmitting(false);
                    }
                }
                }>
                {({ isSubmitting }) => (
                    <Form>
                        <div className='mb-4'>
                            <label
                                htmlFor='name'
                                className='block text-gray-700 text-sm font-bold mb-2'>
                                Nombre
                            </label>
                            <Field
                                type='text'
                                name='name'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                            <ErrorMessage name='name' component='div' />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='email'
                                className='block text-gray-700 text-sm font-bold mb-2'>
                                Correo electrónico
                            </label>
                            <Field
                                type='email'
                                name='email'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                            <ErrorMessage name='email' component='div' />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='social_network'
                                className='block text-gray-700 text-sm font-bold mb-2'>
                                Red social
                            </label>
                            <Field
                                type='text'
                                name='social_network'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                            <ErrorMessage name='social_network' component='div' />
                        </div>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                            Agregar
                        </button>
                    </Form>
                )}
            </Formik>
            <div>
            <h3>Equipo Agregado</h3>
                    {Array.isArray(teamDevInfo)? teamDevInfo.map((teamDev, index)=>{
                        return (
							<div key={index}>
								<h4>{teamDev.name}</h4>
								<p>{teamDev.email}</p>
								<p>{teamDev.social_network}</p>
							</div>
						);
                    }): null}
            </div>
        </div>
    );
};

