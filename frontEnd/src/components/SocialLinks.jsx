import { useEffect } from 'react';
import { getCV } from '../features/cv/cvSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './Loading/Loading';
import { Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const SocialLinks = () => {
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
			<div className='flex justify-center items-center'>
				<Loading />
			</div>
		);
	} else if (status === 'succeeded') {
		content = (
			<Box display='flex' justifyContent='center' mt={4}>
				<Box mx={2}>
					<a href={cvInfo?.social_media?.linkedin}>
						<LinkedInIcon
							fontSize='large'
							className='hover:text-linkedin transition duration-300'
						/>
					</a>
				</Box>
				<Box mx={2}>
					<a href={cvInfo?.social_media?.github}>
						<GitHub
							fontSize='large'
							className='hover:text-light_grayish_blue transition duration-300'
						/>
					</a>
				</Box>
				<Box mx={2}>
					<a href='http://wa.me/573132074757#'>
						<WhatsAppIcon
							fontSize='large'
							className='hover:text-soft_green transition duration-300'
						/>
					</a>
				</Box>
			</Box>
		);
	} else if (status === 'failed') {
		content = <div className='text-red-500 font-semibold'>{error}</div>;
	}

	return (
		<div className='p-4 rounded-lg'>
			{' '}
			{/* Estilo de fondo y sombra */}
			{content}
		</div>
	);
};
