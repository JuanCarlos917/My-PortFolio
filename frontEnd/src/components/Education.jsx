import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getEducation} from '../features/education/educationSlice'

export const Education = () => {
    const dispatch = useDispatch();
    const educationInfo = useSelector((state) => state.education?.educationInfo);
    const status = useSelector((state) => state.education.status);
    const error = useSelector((state) => state.education.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getEducation());
        }
    }, [status, dispatch]);

    let content;

    if (status === 'loading' || !educationInfo) {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		content = (
			<div>
				<h2>Educación:</h2>
				<p>{educationInfo?.bio}</p>
				<h2>Habilidades </h2>
				<h3>Diseño Front end:</h3>
				<ul>
					{educationInfo?.skills?.frontend?.map((skill, index) => (
						<li key={index}>{skill}</li>
					))}
				</ul>
				<h3>Backend:</h3>
				<ul>
					{educationInfo?.skills?.backend?.map((skill, index) => (
						<li key={index}>{skill}</li>
					))}
				</ul>
				<h3>Base de datos:</h3>
				<ul>
					{educationInfo?.skills?.database?.map((skill, index) => (
						<li key={index}>{skill}</li>
					))}
				</ul>
			</div>
		);
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

    return <div>{content}</div>;
}