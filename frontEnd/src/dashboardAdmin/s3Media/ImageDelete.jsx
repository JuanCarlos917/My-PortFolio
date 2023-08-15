import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteImage,
	getListImages,
} from '../../features/s3Media/s3MediaSlice';

export const DeleteImage = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.s3Media);
	const s3mediainfo = useSelector((state) => state.s3Media?.s3mediainfo) || [];

	// Estado local para la clave de la imagen seleccionada para ser eliminada
	const [selectedKey, setSelectedKey] = useState(null);

	const handleDelete = async () => {
		if (selectedKey) {
			// Llamada para eliminar la imagen
			await dispatch(deleteImage(selectedKey));

			// Actualizar la lista de imágenes
			dispatch(getListImages());

			// Limpiar la clave seleccionada
			setSelectedKey(null);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (s3mediainfo.length === 0) {
		return <div>No hay imágenes en el bucket Para eliminar </div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<h1>Delete Image</h1>
			<select
				value={selectedKey}
				onChange={(e) => setSelectedKey(e.target.value)}>
				<option value=''>Select an image to delete</option>
				{s3mediainfo.map((image) => (
					<option key={image.key} value={image.key}>
						{image}
					</option>
				))}
			</select>
			<button onClick={handleDelete} disabled={!selectedKey}>
				Delete Image
			</button>
		</div>
	);
};
