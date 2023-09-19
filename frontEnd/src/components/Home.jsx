import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../features/about/aboutSlice';
import { Loading } from './Loading/Loading';
import { ContactMe } from './contactMe';

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
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
					<div className='space-y-2'>
						<h1 className='text-4xl font-sf'>{`${
							cvInfo?.name || 'Juan Carlos'
						} ${cvInfo?.lastName || 'Gómez'}`}</h1>
						<p className='text-lg font-ysabeau'>{aboutInfo?.bio}</p>
						<div className='flex space-x-4 mt-4'>
							<a
								href={cvInfo?.social_media?.linkedin}
								className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
								LinkedIn
							</a>
							<a
								href={cvInfo?.social_media?.github}
								className='bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded'>
								GitHub
							</a>
						</div>
					</div>
					<div>
						<img
							src={cvInfo?.imageUrl}
							alt='Juan Carlos Gomez'
							className='rounded-full'
						/>
					</div>
					<div>
						<ContactMe />
					</div>
				</div>
			)}
		</div>
	);
};
