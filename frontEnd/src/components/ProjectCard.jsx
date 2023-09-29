import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../features/project/projectSlice';
import { Loading } from './Loading/Loading';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export const ProjectCard = () => {
	const dispatch = useDispatch();

	const projectInfo = useSelector((state) => state.project.projectInfo);
	const status = useSelector((state) => state.project.status);
	const error = useSelector((state) => state.project.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getProject());
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
			<ImageList sx={{ width: '100%', height: 450 }}>
				{Array.isArray(projectInfo) &&
					projectInfo.map((project) => (
						<ImageListItem key={project.image}>
							<Link to={project.url}>
								<img
									srcSet={`${project.image}`}
									src={`${project.image}`}
									alt={project.title}
									loading='lazy'
									style={{
										width: '100%', // Asegurarse de que la imagen ocupe todo el ancho del contenedor
										height: '100%', // Asegurarse de que la imagen ocupe todo el alto del contenedor
										objectFit: 'cover', // Ajustar la imagen al contenedor sin estirarla
										display: 'block', // Elimina cualquier espacio adicional alrededor de la imagen
									}}
								/>
							</Link>
							<ImageListItemBar
								title={project.title}
								subtitle={
									<Link
										to={project.url}
										className='text-vivid_blue hover:underline'>
										Ver proyecto
									</Link>
								}
								actionIcon={
									<Link to={`/projects`}>
										<IconButton
											sx={{
												color: 'rgba(255, 255, 255, 0.54)',
											}}
											aria-label={`info about ${project.title}`}>
											<InfoIcon />
										</IconButton>
									</Link>
								}
								sx={{
									backgroundColor: 'rgba(55, 189, 116, 0.5)',
								}}
							/>
						</ImageListItem>
					))}
			</ImageList>
		);
	} else if (status === 'failed') {
		content = <Typography color='error'>{error}</Typography>;
	}

	return <div className='container mx-auto p-4'>{content}</div>;
};
