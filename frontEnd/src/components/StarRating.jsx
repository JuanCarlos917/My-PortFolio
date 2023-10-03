import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStarRating } from '../features/starRating/starRatingSlice';
import { Loading } from './Loading/Loading';

export const StarRating = () => {
	const dispatch = useDispatch();
	const starRating = useSelector((state) => state.starRating.starRating);
	console.log(starRating);
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
			<div className='flex justify-center items-center h-screen'>
				<h1 className='text-4xl font-sf'>{starRating}</h1>
			</div>
		);
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return <div>{content}</div>;
};
