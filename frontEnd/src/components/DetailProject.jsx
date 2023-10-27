import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../features/project/projectSlice';
import { Loading } from './Loading/Loading';
import { Typography } from '@mui/material';
import { Image } from '@nextui-org/react';
import { useParams, Link } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton, Grid, Paper } from '@mui/material';

export const DetailProject = () => {
	const { id } = useParams();

	const dispatch = useDispatch();

	const projectDetail = useSelector((state) => state.project?.projectById);
	const status = useSelector((state) => state.project?.status);
	const error = useSelector((state) => state.project?.error);

	useEffect(() => {
		dispatch(getDetail(id));
	}, [dispatch, id]);

	let content;

	if (status === 'loading') {
		content = (
			<div className='flex justify-center items-center h-screen'>
				<Loading />
			</div>
		);
	} else if (status === 'succeeded' && projectDetail) {
		content = (
			<Paper elevation={3} className='mt-10 p-6 rounded-lg'>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<Image
							alt={projectDetail.title}
							className='object-cover w-full rounded-xl'
							src={projectDetail.image}
							width={270}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography
							variant='h5'
							gutterBottom
							className='font-kanit text-Midnight_Blue mb-4'>
							{projectDetail.title}
						</Typography>
						<Typography
							variant='subtitle1'
							color='textSecondary'
							gutterBottom
							className='mb-4 font-sf text-dark_grayish_blue'>
							{projectDetail.description}
						</Typography>
						<Typography
							variant='subtitle1'
							color='textSecondary'
							className='mb-4 font-sf text-dark_grayish_blue'>
							{projectDetail.technologies}
						</Typography>
						<Typography
							variant='subtitle2'
							gutterBottom
							className='font-volkhov text-Midnight_Blue mb-4'>
							Developers:
							<div className='mt-2'>
								{projectDetail.TeamDevs.map((dev) => (
									<div
										key={dev.id}
										className='flex items-center mb-2'>
										<span className='mr-2'>{dev.name}</span>
										<IconButton
											href={dev.social_network}
											color='primary'>
											<LinkedInIcon />
										</IconButton>
									</div>
								))}
							</div>
						</Typography>
						<Link to={projectDetail.url}>
							<Typography
								variant='h5'
								className='mt-2 font-bold text-vivid_blue hover:text-bright_red cursor-pointer'>
								Ver Proyecto
							</Typography>
						</Link>
					</Grid>
				</Grid>
			</Paper>
		);
	} else if (status === 'failed') {
		content = <div className='text-bright_red font-kanit'>{error}</div>;
	}

	return (
		<div className='flex flex-col items-center justify-center w-full px-4 pb-3 max-w-screen-lg mx-auto'>
			{content}
		</div>
	);
};
