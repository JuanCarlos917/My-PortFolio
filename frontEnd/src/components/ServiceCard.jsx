import { Card, CardHeader, Image } from '@nextui-org/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../features/services/servicesSlice';
import { Loading } from './Loading/Loading';


export const ServiceCard = () => {
	const dispatch = useDispatch();
	const servicesInfo = useSelector((state) => state.services?.servicesInfo);
	const status = useSelector((state) => state.services.status);
	const error = useSelector((state) => state.services.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getServices());
		}
	}, [status, dispatch]);

	if (status === 'loading') {
		return (
			<div className='flex justify-center items-center h-screen'>
				<Loading />
			</div>
		);
	}

	if (status === 'failed') {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='gap-2 grid grid-cols-12 grid-rows-2 px-9 mt-5 '>
			{Array.isArray(servicesInfo) &&
				servicesInfo.map((service, index) => (
					<Card className='col-span-12 sm:col-span-4 ' key={index}>
						<CardHeader className='absolute z-10  flex-col !items-start p-4'>
							<div className='bg-black bg-opacity-50 p-3  rounded'>
								<h4 className='text-2xl text-white font-playfair font-bold mb-10'>
									{service.name}
								</h4>
								<p className='text-md text-pale_blue uppercase font-oswald shadow-md'>
									{service.description}
								</p>
							</div>
						</CardHeader>
						<Image
							removeWrapper
							alt={service.name}
							className='z-0 w-full h-full object-cover'
							src={service.imageUrl}
						/>
					</Card>
				))}
		</div>
	);
};
