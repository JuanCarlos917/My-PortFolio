import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCV } from '../features/cv/cvSlice';
import { Loading } from './Loading/Loading';
import { SocialLinks } from './SocialLinks';

export const PersonalInfo = () => {
	const dispatch = useDispatch();
	const cvInfo = useSelector((state) => state.cv.cvInfo);
	const status = useSelector((state) => state.cv.status);
	const error = useSelector((state) => state.cv.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getCV());
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
			<div className='space-y-4'>
				<h3 className='text-xl font-kanit'>
					Nombre{' '}
					<span className='font-sf'>
						{cvInfo?.name} {cvInfo?.lastName}
					</span>
				</h3>
				<h3 className='text-xl font-kanit'>
					Email <span className='font-sf'>{cvInfo?.email}</span>
				</h3>
				<h3 className='text-xl font-kanit'>
					Teléfono{' '}
					<span className='font-sf'>+57 {cvInfo?.phone}</span>
				</h3>
				<div className='flex space-x-4'>
                    <SocialLinks />
				</div>
			</div>
		);
	} else if (status === 'failed') {
		content = (
			<div className='text-red-500 font-semibold'>
				{error}
			</div>
		);
	}

	return (
		<div className='p-4 rounded-lg'>
			{' '}
			{/* Estilo de fondo y sombra */}
			{content}
		</div>
	);
};
