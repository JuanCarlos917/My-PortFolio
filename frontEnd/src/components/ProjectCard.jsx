import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../features/project/projectSlice';
import { Link } from 'react-router-dom';
import { Loading } from './Loading/Loading';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import Typography from '@mui/material/Typography';

export const ProjectCard = () => {
	const dispatch = useDispatch();
	const projectInfo = useSelector((state) => state.project?.projectInfo);
	const status = useSelector((state) => state.project?.status);
	const error = useSelector((state) => state.project?.error);

	useEffect(() => {
		dispatch(getProject());
	}, [dispatch]);

	let content;

	if (status === 'loading') {
		content = (
			<div className='flex justify-center items-center h-screen'>
				<Loading />
			</div>
		);
	} else if (status === 'succeeded') {
		content = (
			<>
				<Typography variant='h3' className='pb-3'>
					Proyectos Destacados
				</Typography>

				<div className='grid grid-cols-2 gap-4'>
					{Array.isArray(projectInfo) &&
						projectInfo.map((project) => (
							<Card
								className='py-4 my-2 hover:shadow-goldenShadow'
								key={project.id}>
								<CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
									<p className='text-tiny uppercase font-bold'>
										{project.title}
									</p>
									<small className='text-default-500'>
										{project.description}
									</small>
									<Link to={`/projects/${project.id}`}>
										<h4 className='font-bold text-vivid_blue hover:text-soft_green'>
											Ver más detalles
										</h4>
									</Link>
								</CardHeader>
								<CardBody className='overflow-visible py-2'>
									<Image
										alt={project.title}
										className='object-cover rounded-xl'
										src={project.image}
										width={270}
									/>
									<Link to={project.url}>
										<h4 className='font-bold text-vivid_blue hover:text-bright_red'>
											Ver Proyecto
										</h4>
									</Link>
								</CardBody>
							</Card>
						))}
				</div>
			</>
		);
	} else if (status === 'failed') {
		content = <Typography color='error'>{error}</Typography>;
	}

	return <div className='container mx-auto p-4 '>{content}</div>;
};
