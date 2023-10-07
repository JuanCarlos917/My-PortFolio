import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getStarRating,deleteStarRating} from '../../features/starRating/starRatingSlice'

export const DeleteStarRating = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const starRating = useSelector((state) => state.starRating?.starRating);
    const specificStarRating = Array.isArray(starRating)
        ? starRating.find((serv) => serv.id.toString() === id)
        : null;

    const status = useSelector((state) => state.starRating.status);
    const error = useSelector((state) => state.starRating.error);
    const modified = useSelector((state) => state.starRating.modified);

    useEffect(() => {
        if (!starRating) {
            dispatch(getStarRating());
        }
    }, [dispatch, starRating]);

    return (
		<div className='container mx-auto p-4'>
			{modified ? (
				<div className='text-green-500 font-semibold text-center text-xl'>
					¡Eliminación realizada con éxito!
				</div>
			) : (
				<>
					{status === 'loading' && (
						<div className='text-center font-semibold text-xl'>
							Eliminando...
						</div>
					)}
					{status === 'failed' && (
						<div className='text-red-500 font-semibold text-center text-xl'>
							{error}
						</div>
					)}
					{!starRating ? (
						<div className='text-center'>
							<p className='mb-4'>
								No se encontró el ningun review para eliminar.
							</p>
							<Link
								to='/dashboard/all-star-rating'
								className='bg-green-500 text-white py-2 px-4 rounded'>
								Crear
							</Link>
						</div>
					) : (
						<div className='p-4 border rounded'>
							<div className='grid grid-cols-2'>
								<div className='col-span-2 text-center font-semibold text-xl'>
									<h4 className='text-lg font-semibold'>
										Estrellas
									</h4>
									<p>{specificStarRating?.starRating}</p>
									<h4 className='text-lg font-semibold'>
										Comentario
									</h4>
									<p>{specificStarRating?.comment}</p>
								</div>
								<div className='col-span-2 text-center'>
									<Link
										to='/dashboard/all-star-rating'
										className='bg-green-500 text-white py-2 px-4 rounded'>
										Cancelar
									</Link>
									<button
										className='bg-red-500 text-white py-2 px-4 rounded'
										onClick={() =>
											dispatch(deleteStarRating(id))
										}>
										Eliminar
									</button>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};
