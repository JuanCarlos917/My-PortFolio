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
		return <Loading />;
	}

	if (status === 'failed') {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 '>
			{Array.isArray(servicesInfo) &&
				servicesInfo.map((service, index) => (
					<Card
						className='col-span-12 sm:col-span-4 h-[300px] '
						key={index}>
						<CardHeader className='absolute z-10 top-1 flex-col !items-start'>
							<p className='text-tiny text-black uppercase font-bold'>
								{service.description}
							</p>
							<h4 className='text-black font-medium text-large'>
								{service.name}
							</h4>
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
