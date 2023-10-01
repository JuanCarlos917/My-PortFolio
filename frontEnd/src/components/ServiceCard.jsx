import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../features/services/servicesSlice';
import { Loading } from './Loading/Loading';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const ServiceCard = () => {
	const dispatch = useDispatch();

	const servicesInfo = useSelector((state) => state.services.servicesInfo);

	const status = useSelector((state) => state.services.status);
	const error = useSelector((state) => state.services.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getServices());
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
		if (servicesInfo && Array.isArray(servicesInfo)) {
			content = (
				<>
					<Typography variant='h3' className='pt-5 pb-3'>
						Servicios Profesionales
					</Typography>
					<Grid container spacing={2} className='pt-10'>
						{servicesInfo.map((service, index) => (
							<Grid item xs={12} md={6} key={index}>
								<Card variant='outlined'>
									<CardContent>
										<Typography variant='h5' gutterBottom>
											{service.name}
										</Typography>
										<Typography
											variant='subtitle1'
											color='textSecondary'
											gutterBottom>
											{service.description}
										</Typography>
										{/* no poner por ahora  */}
										{/* <Typography variant='subtitle1' color='textSecondary'>
									${service.price}
								</Typography> */}
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</>
			);
		}
	} else if (status === 'failed') {
		content = <Typography color='error'>{error}</Typography>;
	}
	return <div>{content}</div>;
};
