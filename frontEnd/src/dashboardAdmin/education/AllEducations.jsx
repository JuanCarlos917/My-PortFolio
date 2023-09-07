import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEducation } from '../../features/education/educationSlice';
import { Link } from 'react-router-dom';

export const AllEducations = () => {
	const dispatch = useDispatch();
	const educationInfo = useSelector((state) => state.education.educationInfo);
	const status = useSelector((state) => state.education.status);
	const error = useSelector((state) => state.education.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getEducation());
		}
	}, [status, dispatch]);

	let content;

	if (status === 'loading') {
		content = (
			<div className='text-center font-semibold text-xl'>Loading...</div>
		);
	} else if (status === 'succeeded') {
		if (educationInfo && Array.isArray(educationInfo)) {
			content = educationInfo.map((edu, index) => (
				<div key={index} className='p-4 border rounded mb-4'>
					<h2 className='text-2xl font-semibold'>
						Educación {index + 1}:
					</h2>
					<div className='grid grid-cols-2'>
						<h3 className='text-lg font-semibold'>Universidad:</h3>
						<p>{edu.institution}</p>
						<h3 className='text-lg font-semibold'>Grado:</h3>
						<p>{edu.degree}</p>
						<h3 className='text-lg font-semibold'>
							Campo de estudio:
						</h3>
						<p>{edu.field_of_study}</p>
						<h3 className='text-lg font-semibold'>Descripción:</h3>
						<p>{edu.description}</p>
						<h3 className='text-lg font-semibold'>
							Fecha de inicio:
						</h3>
						<p>{edu.startDate}</p>
						<h3 className='text-lg font-semibold'>
							Fecha de finalización:
						</h3>
						<p>{edu.endDate}</p>
					</div>
					<div className='flex space-x-4 mt-4'>
						<Link
							to={`/dashboard/update-education/${edu.id}`}
							className='bg-blue-500 text-white py-2 px-4 rounded'>
							Modificar
						</Link>
						<Link
							to={`/dashboard/delete-education/${edu.id}`}
							className='bg-red-500 text-white py-2 px-4 rounded'>
							Eliminar
						</Link>
					</div>
				</div>
			));
		} else {
			content = (
				<div className='text-center'>
					<p className='mb-4'>
						No existe información de educación para modificar.
					</p>
					<Link
						to='/dashboard/form-education'
						className='bg-green-500 text-white py-2 px-4 rounded'>
						Crear
					</Link>
				</div>
			);
		}
	} else if (status === 'failed') {
		content = (
			<div className='text-red-500 font-semibold text-center text-xl'>
				{error}
			</div>
		);
	}

	return <div className='container mx-auto p-4'>{content}</div>;
};
