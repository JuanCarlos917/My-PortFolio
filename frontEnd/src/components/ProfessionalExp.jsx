import { useEffect } from 'react';
import { getProfessionalExp } from '../features/professionalExp/professionalExpSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './Loading/Loading';

export const ProfessionalExp = () => {
	const dispatch = useDispatch();
	const professionalExpInfo = useSelector(
		(state) => state.professionalExp.professionalExpInfo,
	);
	const status = useSelector((state) => state.professionalExp.status);
	const error = useSelector((state) => state.professionalExp.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getProfessionalExp());
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
				{Array.isArray(professionalExpInfo) &&
					professionalExpInfo.map((experience, index) => (
						<div
							key={index}
							className='rounded-lg overflow-hidden shadow-lg p-6 bg-white'>
							<h2 className='text-xl font-sf mt-4 mb-2'>
								{experience.company}
							</h2>
							<p className='text-gray-600 mb-4 font-ysabeau '>
								<span className='font-sf '>Descripción:</span>{' '}
								{experience.description}
							</p>
							<p className='text-gray-600 mb-4 font-ysabeau'>
								<span className='font-sf'>Posición:</span>{' '}
								{experience.position}
							</p>
							<p className='text-gray-600 mb-4 font-ysabeau'>
								<span className='font-sf '>
									Inicio:
								</span>{' '}
								{experience.startDate}
							</p>
							<p className='text-gray-600 font-ysabeau'>
								<span className='font-sf '>
									Fin:
								</span>{' '}
								{experience.endDate}
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
