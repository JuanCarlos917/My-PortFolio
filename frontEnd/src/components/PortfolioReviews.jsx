import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStarRating } from '../features/starRating/starRatingSlice';
import { Loading } from './Loading/Loading';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export const Reviews = () => {
	const dispatch = useDispatch();

	const starRating = useSelector((state) => state.starRating.starRating);
	const status = useSelector((state) => state.starRating.status);
	const error = useSelector((state) => state.starRating.error);

	useEffect(() => {
		dispatch(getStarRating());
	}, [dispatch]);

	let content;
	if (status === 'loading') {
		content = (
			<div className='flex justify-center items-center h-screen'>
				<Loading />
			</div>
		);
	} else if (status === 'succeeded') {
		content = (
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8'>
				{starRating &&
					Array.isArray(starRating) &&
					starRating.map((review, index) => (
						<div
							key={index}
							className='rounded-lg overflow-hidden shadow-lg p-4 sm:p-6 bg-white'>
							<p className='text-gray-600 mb-3 font-ysabeau'>
								{review.comment}
							</p>
							<Rating
								name={`rating-${index}`}
								value={review.starRating}
								size='small'
								emptyIcon={<StarIcon fontSize='inherit' />}
								readOnly
							/>
						</div>
					))}
			</div>
		);
	} else if (status === 'failed') {
		content = (
			<div
				className='text-red-500 font-semibold
            text-center text-xl'>
				{error}
			</div>
		);
	}
	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<h1 className='text-center text-3xl font-sf font-semibold mb-8'>
				Reviews
			</h1>
			{content}
		</div>
	);
};
