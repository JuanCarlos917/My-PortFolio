import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../features/about/aboutSlice';
import { Loading } from './Loading/Loading';

export const AboutMe = () => {
	const dispatch = useDispatch();
	const aboutInfo = useSelector((state) => state.about.aboutInfo);
	const status = useSelector((state) => state.about.status);
	const error = useSelector((state) => state.about.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getAbout());
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
			<div className='space-y-6'>
				<h2 className='text-2xl font-sf border-b pb-2'>Biografía </h2>
				<p className='text-lg font-ysabeau'>{aboutInfo?.bio}</p>

				<h2 className='text-2xl font-sf border-b pb-2'>Habilidades </h2>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 space-y-4 md:space-y-0'>
					<section>
						<h3 className='text-xl font-sf'>Diseño Front-end </h3>
						<ul className='list-disc pl-5 font-ysabeau'>
							{Array.isArray(aboutInfo?.skills?.frontend) ? (
								aboutInfo?.skills?.frontend.map(
									(skill, index) => (
										<li key={index} className='text-lg'>
											{skill}
										</li>
									),
								)
							) : (
								<li className='text-gray-500'>
									No hay habilidades de frontend disponibles.
								</li>
							)}
						</ul>
					</section>

					<section>
						<h3 className='text-xl font-sf'>Diseño Back-end </h3>
						<ul className='list-disc pl-5 font-ysabeau'>
							{Array.isArray(aboutInfo?.skills?.backend) ? (
								aboutInfo?.skills?.backend.map(
									(skill, index) => (
										<li key={index} className='text-lg'>
											{skill}
										</li>
									),
								)
							) : (
								<li className='text-gray-500'>
									No hay habilidades de backend disponibles.
								</li>
							)}
						</ul>
					</section>

					<section>
						<h3 className='text-xl font-sf'>Base de datos </h3>
						<ul className='list-disc pl-5 font-ysabeau'>
							{Array.isArray(aboutInfo?.skills?.database) ? (
								aboutInfo?.skills?.database.map(
									(skill, index) => (
										<li key={index} className='text-lg'>
											{skill}
										</li>
									),
								)
							) : (
								<li className='text-gray-500'>
									No hay habilidades de base de datos
									disponibles.
								</li>
							)}
						</ul>
					</section>
				</div>
			</div>
		);
	} else if (status === 'failed') {
		content = (
			<div className='text-red-500 font-semibold p-4 rounded bg-red-100 border border-red-400'>
				Error: {error}
			</div>
		);
	}

	return <div className='p-4 rounded-lg bg-white'>{content}</div>;
};
