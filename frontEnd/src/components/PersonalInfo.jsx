import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCV } from '../features/cv/cvSlice';
import { Loading } from './Loading/Loading';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';

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
				<h3 className='text-xl font-aboreto'>
					Nombre{' '}
					<span className='font-ysabeau'>
						{cvInfo?.name} {cvInfo?.lastName}
					</span>
				</h3>
				<h3 className='text-xl font-aboreto'>
					Email <span className='font-ysabeau'>{cvInfo?.email}</span>
				</h3>
				<h3 className='text-xl font-aboreto'>
					Teléfono{' '}
					<span className='font-ysabeau'>+57 {cvInfo?.phone}</span>
				</h3>
				<h3 className='text-xl font-aboreto'>Redes sociales</h3>
				<div className='flex space-x-4'>
					<a href={cvInfo?.social_media?.linkedin}>
						<LinkedInIcon
							fontSize='large'
							className='hover:text-light_grayish_blue transition duration-300'
						/>
					</a>
					<a href={cvInfo?.social_media?.github}>
						<GitHub
							fontSize='large'
							className='hover:text-light_grayish_blue transition duration-300'
						/>
					</a>
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
