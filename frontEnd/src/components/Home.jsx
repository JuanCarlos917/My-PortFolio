import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../features/about/aboutSlice';
import { Loading } from './Loading/Loading';
import { ContactMe } from './contactMe';
import { Image } from '@nextui-org/react';
import Linkedin from '@mui/icons-material/Linkedin';
import GitHub from '@mui/icons-material/GitHub';

export const Home = () => {
	const dispatch = useDispatch();
	const aboutInfo = useSelector((state) => state.about.aboutInfo);
	const cvInfo = useSelector((state) => state.cv.cvInfo);

	const status = useSelector((state) => state.about.status);
	const error = useSelector((state) => state.about.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getAbout());
		}
	}, [status, dispatch]);

	return (
		<div className='container mx-auto p-6'>
			{status === 'loading' ? (
				<div className='text-center text-lg font-semibold'>
					<Loading />
				</div>
			) : status === 'failed' ? (
				<div className='text-center text-red-500 font-semibold'>
					{error}
				</div>
			) : (
				<div>
					<div className='flex flex-col md:flex-row gap-8 items-start mb-8'>
						<div className='flex-1 space-y-4'>
							<h1 className='text-4xl font-sf'>{`${
								cvInfo?.name || 'Juan Carlos'
							} ${cvInfo?.lastName || 'Gómez'}`}</h1>
							<p className='text-lg font-ysabeau'>
								{aboutInfo?.bio}
							</p>
							<div className='flex space-x-4 mt-4'>
								<a href={cvInfo?.social_media?.linkedin}>
									<Linkedin
										className='hover:text-linkedin transition duration-300'
										color='disabled'
										fontSize='large'
									/>
								</a>
								<a href={cvInfo?.social_media?.github}>
									<GitHub
										className='hover:text-darck_black transition duration-300'
										color='disabled'
										fontSize='large'
									/>
								</a>
							</div>
						</div>
						<div className='flex-1'>
							<Image
								isBlurred
								src={cvInfo?.imageUrl}
								alt='Juan Carlos Gomez'
								className='w-full md:w-3/4 mx-auto'
							/>
						</div>
					</div>
					<div className='text-center mt-8'>
						<ContactMe />
					</div>
				</div>
			)}
		</div>
	);
};
