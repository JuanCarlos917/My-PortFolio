import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getEducation,
	deleteEducation,
} from '../../features/education/educationSlice';

export const DeleteEducation = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const educationInfo = useSelector(
		(state) => state.education?.educationInfo,
	);
	const specificEducation = Array.isArray(educationInfo)
		? educationInfo.find((edu) => edu.id.toString() === id)
		: null;

	const status = useSelector((state) => state.education.status);
	const error = useSelector((state) => state.education.error);
	const modified = useSelector((state) => state.education.modified);

	useEffect(() => {
		if (!educationInfo) {
			dispatch(getEducation());
		}
	}, [dispatch, educationInfo]);

	return (
		<div className='container mx-auto p-4'>
			{modified ? (
				<div className='text-green-500 font-semibold text-center text-xl'>
					¡Eliminación realizada con éxito!
				</div>
			) : (
				<>
					{status === 'loading' && (
						<div className='text-center font-semibold text-xl'>
							Eliminando...
						</div>
					)}
					{status === 'failed' && (
						<div className='text-red-500 font-semibold text-center text-xl'>
							{error}
						</div>
					)}

					{!educationInfo ? (
						<div className='text-center'>
							<p className='mb-4'>
								No existe información de educación para
								eliminar.
							</p>
							<Link
								to='/dashboard/form-education'
								className='bg-green-500 text-white py-2 px-4 rounded'>
								Crear
							</Link>
						</div>
					) : (
						<div className='p-4 border rounded'>
							<div className='grid grid-cols-2'>
								<h4 className='text-lg font-semibold'>
									Grado:
								</h4>
								<p>{specificEducation?.degree}</p>
								<h4 className='text-lg font-semibold'>
									Descripción:
								</h4>
								<p>{specificEducation?.description}</p>
								<h4 className='text-lg font-semibold'>
									Universidad:
								</h4>
								<p>{specificEducation?.institution}</p>
								<h4 className='text-lg font-semibold'>
									Campo de estudio:
								</h4>
								<p>{specificEducation?.field_of_study}</p>
								<h4 className='text-lg font-semibold'>
									Fecha de inicio:
								</h4>
								<p>{specificEducation?.startDate}</p>
								<h4 className='text-lg font-semibold'>
									Fecha de finalización:
								</h4>
								<p>{specificEducation?.endDate}</p>
							</div>
							<div className='flex space-x-4 mt-4'>
								<button
									onClick={() => {
										dispatch(deleteEducation(id));
									}}
									className='bg-red-500 text-white py-2 px-4 rounded'>
									Eliminar
								</button>
								<Link
									to={`/dashboard/update-education/${id}`}
									className='bg-blue-500 text-white py-2 px-4 rounded'>
									Modificar
								</Link>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};
