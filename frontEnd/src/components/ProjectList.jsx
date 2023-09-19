import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../features/project/projectSlice';
import { Loading } from './Loading/Loading';

export const ProjectList = () => {
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
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{Array.isArray(projectInfo) &&
					projectInfo.map((project, index) => (
						<div
							key={index}
							className='rounded-lg overflow-hidden shadow-lg p-6 bg-white'>
							<img
								src={project.image}
								alt={project.title}
								className='w-full object-cover h-48'
							/>
							<h2 className='text-xl font-semibold mt-4 mb-2'>
								Proyecto: {project.title}
							</h2>
							<p className='text-gray-600 mb-4'>
								{project.description}
							</p>
							<a
								href={project.url}
								className='text-blue-600 hover:underline'>
								{project.title}
							</a>
							{/* ... Resto del contenido de la card ... */}
						</div>
					))}
			</div>
		);
	} else if (status === 'failed') {
		content = <div className='text-red-600 font-semibold'>{error}</div>;
	}

	return <div className='container mx-auto p-8'>{content}</div>;
};
