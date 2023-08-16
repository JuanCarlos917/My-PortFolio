import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUrlImage,
	getListImages,
} from '../../features/s3Media/s3MediaSlice';

export const GenerateUrl = () => {
	const dispatch = useDispatch();
	const { url, loading, error } = useSelector((state) => state.s3Media);
	const s3mediainfo = useSelector((state) => state.s3Media?.s3mediaInfo) || [];
	// Estado local para la clave de la imagen seleccionada para generar su URL
	const [selectedKey, setSelectedKey] = useState(null);

	const handleCopyUrl = async () => {
		try {
			await navigator.clipboard.writeText(url.url);
			alert('URL copiada');
		} catch (error) {
			alert('No se pudo copiar la URL. Error: ' + error.message);
		}
	};


	const handleGenerateUrl = async () => {
		if (selectedKey) {
			// Llamada para generar la URL de la imagen
			await dispatch(getUrlImage(selectedKey));
		}
	};

	useEffect(() => {
		// Obtener la lista de imágenes cuando el componente se monta
		dispatch(getListImages());
	}, [dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}
	if (s3mediainfo.length === 0) {
		return <div>No hay imágenes en el bucket</div>;
	}
	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<h1>Generate Image URL</h1>
			<select
				value={selectedKey}
				onChange={(e) => setSelectedKey(e.target.value)}>
				<option value=''>Select an image to generate its URL</option>
				{s3mediainfo.map((image) => (
					<option key={image.key} value={image.key}>
						{image}
					</option>
				))}
			</select>
			<button onClick={handleGenerateUrl} disabled={!selectedKey}>
				Generate URL
			</button>

			{url && (
				<div>
					<h2>Image Preview</h2>
					<img src={url.url} alt='Generated Preview' />
					<p>URL</p>
					<input type='text' readOnly value={url.url} />
					<button onClick={handleCopyUrl}>Copy URL</button>
				</div>
			)}
		</div>
	);
};
