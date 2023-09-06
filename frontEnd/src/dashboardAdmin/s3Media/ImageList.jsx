import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListImages } from '../../features/s3Media/s3MediaSlice';

export const ImageList = () => {
	const dispatch = useDispatch();
	const images = useSelector((state) => state.s3Media?.s3mediaInfo) || [];
	const loading = useSelector((state) => state.s3Media?.loading);
	const error = useSelector((state) => state.s3Media.error);

	useEffect(() => {
		dispatch(getListImages());
	}, [dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (images.length === 0) {
		return <div>No hay imágenes en el bucket</div>;
	}
	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			{images.map((image) => (
				<div key={image.key}>
					<p>Nombre de la imagen: {image}</p>
				</div>
			))}
		</div>
	);
};
