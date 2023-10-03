import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getStarRating } from '../../features/starRating/starRatingSlice';

export const AllStarRating = () => {
	const dispatch = useDispatch();
	const starRatingInfo = useSelector((state) => state.starRating.starRating);
	console.log(starRatingInfo);
	const status = useSelector((state) => state.starRating.status);
	// const error = useSelector((state) => state.starRating.error);

	useEffect(() => {
		dispatch(getStarRating());
	}, [dispatch]);

	let content;

	if (status === 'loading') {
		content = (
			<div className='text-center font-semibold text-xl'>Loading...</div>
		);
	} else if (status === 'succeeded') {
		if (starRatingInfo && Array.isArray(starRatingInfo)) {
			content = starRatingInfo.map((starRa, index) => (
				<div key={index} className='p-4 border rounded mb-4'>
					<h2 className='text-2xl font-semibold'>
						Servicio {index + 1}:
					</h2>
					<div className='grid grid-cols-2'>
						<h3 className='text-lg font-semibold'>Nombre:</h3>
						<p>{starRa.starRating}</p>
						<h3 className='text-lg font-semibold'>Descripción:</h3>
						<p>{starRa.comment}</p>
					</div>
					{/* <div className='flex space-x-4 mt-4'>
						<Link
							to={`/dashboard/update-service/${starRatingInfo.id}`}
							className='bg-blue-500 text-white py-2 px-4 rounded'>
							Modificar
						</Link>
						<Link
							to={`/dashboard/delete-service/${starRatingInfo.id}`}
							className='bg-red-500 text-white py-2 px-4 rounded'>
							Eliminar
						</Link>
					</div> */}
				</div>
			));
		}
	} else if (status === 'failed') {
		content = (
			<div className='text-red-500 font-semibold text-center text-xl'>
				{/* {error} */}
			</div>
		);
	}
	return (
		<div className='container mx-auto'>
			<h1 className='text-4xl font-semibold text-center my-8'>
				Todas las calificaciones
			</h1>
			<>{content}</>
		</div>
	);

};
