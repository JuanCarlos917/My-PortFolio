import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../features/about/aboutSlice';

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
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		content = (
			<div>
				<h2>Biografía:</h2>
                <p>{aboutInfo?.bio}</p>
				<h2>Habilidades </h2>
				<h3>Diseño Front end:</h3>
				<ul>
					{aboutInfo?.skills?.frontend?.map((skill, index) => (
						<li key={index}>{skill}</li>
					))}
				</ul>
				<h3>Backend:</h3>
				<ul>
					{aboutInfo?.skills?.backend?.map((skill, index) => (
						<li key={index}>{skill}</li>
					))}
				</ul>
				<h3>Base de datos:</h3>
				<ul>
					{aboutInfo?.skills?.database?.map((skill, index) => (
						<li key={index}>{skill}</li>
					))}
				</ul>
			</div>
		);
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return <div>{content}</div>;
};
