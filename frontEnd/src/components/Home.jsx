import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../features/about/aboutSlice';
import { Loading } from './Loading/Loading';

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
						<h1 className='text-4xl font-bold'>{`${cvInfo?.name} ${cvInfo?.lastName}`}</h1>
						<p className='text-lg'>{aboutInfo?.bio}</p>
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
							src='https://s3mediapf.s3.us-east-1.amazonaws.com/Captura%20de%20pantalla%202023-06-21%20a%20la%28s%29%2020.42.11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAXLCS7UOKL45CJ3TG%2F20230906%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230906T221829Z&X-Amz-Expires=3600&X-Amz-Signature=d36930728e3a490f1eb226260e9cf4cbeccac0b3a156f3fa277c265e48ca63cc&X-Amz-SignedHeaders=host&x-id=GetObject'
							className='w-full object-cover rounded-lg shadow-md'
						/>
					</div>
				</div>
			)}
		</div>
	);
};
