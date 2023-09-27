import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../features/project/projectSlice';
import { Loading } from './Loading/Loading';
import Linkedin from '@mui/icons-material/Linkedin';

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
								className='w-full object-cover h-48 mb-4'
							/>
							<h2 className='text-xl font-sf mt-4 mb-2'>
								{project.title}
							</h2>
							<p className='text-gray-600 mb-4 font-ysabeau'>
								{project.description}
							</p>
							<h4 className='font-sf text-lg mb-2'>
								Tecnologías:
							</h4>
							<p className='text-gray-600 mb-4 font-ysabeau'>
								{project.technologies}
							</p>

							<h4 className='font-sf text-lg mb-2'>Equipo:</h4>
							<ul className='list-disc pl-5 mb-4 font-ysabeau'>
								{Array.isArray(project.TeamDevs) &&
									project.TeamDevs.map((team, teamIndex) => (
										<li
											key={teamIndex}
											className='text-gray-600 flex items-center justify-between'>
											<span>{team.name}</span>
											{team.social_network && (
												<a
													href={team.social_network}
													target='_blank'
													rel='noopener noreferrer'>
													<Linkedin className='text-linkedin hover:text-golden transition duration-300' />
												</a>
											)}
										</li>
									))}
							</ul>

							<h4 className='font-sf text-lg mb-2'>Tags:</h4>
							<ul className='list-disc pl-5 mb-4 font-ysabeau'>
								{Array.isArray(project.Tags) &&
									project.Tags.map((tag, tagIndex) => (
										<li
											key={tagIndex}
											className='text-gray-600 '>
											{tag.name}
										</li>
									))}
							</ul>

							<h4 className='font-sf text-lg mb-2'>
								Categorías:
							</h4>
							<ul className='list-disc pl-5 mb-4 font-ysabeau'>
								{Array.isArray(project.Categories) &&
									project.Categories.map(
										(category, categoryIndex) => (
											<li
												key={categoryIndex}
												className='text-gray-600'>
												{category.name}
											</li>
										),
									)}
							</ul>

							<a
								href={project.url}
								className='text-vivid_blue hover:underline mt-2'>
								Ver proyecto
							</a>
						</div>
					))}
			</div>
		);
	} else if (status === 'failed') {
		content = <div className='text-red-600 font-semibold'>{error}</div>;
	}

	return <div className='container mx-auto p-8'>{content}</div>;
};
