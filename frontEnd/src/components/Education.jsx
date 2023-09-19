import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEducation } from '../features/education/educationSlice';
import { Loading } from './Loading/Loading';

export const Education = () => {
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
			<div className='flex justify-center items-center h-screen'>
				<Loading />
			</div>
		);
	} else if (status === 'succeeded') {
		content = (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
				{Array.isArray(educationInfo) &&
					educationInfo.map((edu, index) => (
						<div
							key={index}
							className='rounded-lg overflow-hidden shadow-lg p-6 bg-white'>
							<h2 className='text-xl font-sf mt-4 mb-2'>
								{edu?.institution}
							</h2>
							<p className='text-gray-600 mb-4 font-ysabeau'>
								<span className='font-sf '>Carrera:</span>{' '}
								{edu?.degree}
							</p>
							<p className='text-gray-600 mb-4 font-ysabeau'>
								<span className='font-sf '>
									Campo de estudio:
								</span>{' '}
								{edu?.field_of_study}
							</p>
							<p className='text-gray-600 mb-4 font-ysabeau'>
								<span className='font-sf '>Descripción:</span>{' '}
								{edu?.description}
							</p>

								<p className='text-gray-600 mb-4 font-ysabeau'>
									<span className='font-sf '>Inicio:</span>{' '}
									{edu?.startDate}
								</p>
								<p className='text-gray-600 font-ysabeau'>
									<span className='font-sf '>Final:</span>{' '}
									{edu?.endDate}
								</p>

						</div>
					))}
			</div>
		);
	} else if (status === 'failed') {
		content = <div className='text-red-600 font-semibold'>{error}</div>;
	}

	return <div className='container mx-auto p-8'>{content}</div>;
};
