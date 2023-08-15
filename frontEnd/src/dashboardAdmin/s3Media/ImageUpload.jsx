import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	uploadImage,
	getListImages,
} from '../../features/s3Media/s3MediaSlice';

export const UploadImage = () => {
	const dispatch = useDispatch();
	const { image, loading, error } = useSelector((state) => state.s3Media);

	// Estado local para almacenar la URL temporal de la imagen seleccionada
	const [previewImage, setPreviewImage] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileSelection = (event) => {
		const file = event.target.files[0];
		if (file) {
			// Crear una URL temporal para el archivo seleccionado
			const imageUrl = URL.createObjectURL(file);
			setPreviewImage(imageUrl);
			setSelectedFile(file);
		}
	};

	const handleUpload = async () => {
		if (selectedFile) {
			// Llamada para subir la imagen
			await dispatch(uploadImage(selectedFile));

			// Actualizar la lista de imágenes
			dispatch(getListImages());

			// Limpiar la previsualización y el archivo seleccionado
			setPreviewImage(null);
			setSelectedFile(null);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<h1>Upload Image</h1>
			{!image && previewImage && <img src={previewImage} alt='preview' />}
			<input
				type='file'
				onChange={handleFileSelection}
				accept='image/*'
			/>
			{!image && <button onClick={handleUpload}>Subir imagen</button>}
		</div>
	);
};
