import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCV } from '../features/cv/cvSlice';

export const PersonalInfo = () => {
	const dispatch = useDispatch();
	const cvInfo = useSelector((state) => state.cv.cvInfo);
	const status = useSelector((state) => state.cv.status);
	const error = useSelector((state) => state.cv.error);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getCV());
		}
	}, [status, dispatch]);

    let content;

    if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {

        content = (
			<div>
				<h2>CV:</h2>
				<h3>Nombre: {cvInfo?.name}</h3>
				<h3>Apellido: {cvInfo?.lastName}</h3>
				<h3>Email: {cvInfo?.email}</h3>
				<h3>Teléfono: {cvInfo?.phone}</h3>
				<h3>Redes sociales:</h3>
				<a href={cvInfo?.social_media?.linkedin}>Linkedin</a>
				<a href={cvInfo?.social_media?.github}>Github</a>
			</div>
		);
        } else if (
		status === 'failed'
	) {
		content = <div> {error}</div>;
	}
	return <div>{content}</div>;
};
