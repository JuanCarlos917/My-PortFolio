import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStarRating } from '../features/starRating/starRatingSlice';
import { Formik, Form, ErrorMessage } from 'formik';
import Rating from '@mui/material/Rating';
import { Button, Textarea } from '@nextui-org/react';
import Typography from '@mui/material/Typography';

export const StarRatingForm = () => {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.starRating.status);
	const error = useSelector((state) => state.starRating.error);
	const [showThankYou, setShowThankYou] = useState(false);
	const [showCommentField, setShowCommentField] = useState(false);
	const loading = useSelector(
		(state) => state.starRating.status === 'loading',
	);

	return (
		<div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			{status === 'failed' && (
				<div className='text-bright_red'>{error}</div>
			)}
			{showThankYou && (
				<div className='text-soft_green flex flex-col items-center'>
					¡Gracias por calificarme! 🚀
				</div>
			)}

			<Formik
				initialValues={{
					starRating: 1,
					comment: '',
				}}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					dispatch(createStarRating(values)).then(() => {
						setSubmitting(false);
						resetForm();
						setShowThankYou(true);
						setTimeout(() => setShowThankYou(false), 3000);
					});
				}}>
				{({ isSubmitting, setFieldValue, values }) => (
					<Form className='space-y-4'>
						<div className='flex flex-col items-center space-y-2'>
							<Typography component='legend'>
								¿Qué tal te parece mi portafolio?
							</Typography>
							<Rating
								name='starRating'
								value={values.starRating}
								onChange={(event, newValue) => {
									setFieldValue('starRating', newValue);
								}}
							/>
							<ErrorMessage
								name='starRating'
								component='div'
								className='text-bright_red'
							/>
						</div>

						{showCommentField && (
							<div className='flex flex-col items-center space-y-2'>
								<Textarea
									name='comment'
									labelPlacement='outside'
									placeholder='Deja tu comentario aquí ...'
									value={values.comment}
									onChange={(e) =>
										setFieldValue('comment', e.target.value)
									}
								/>

								<Button
									size='sm'
									radius='sm'
									color='danger'
									variant='ghost'
									onClick={() => setShowCommentField(false)}>
									Ocultar
								</Button>
							</div>
						)}

						{!showCommentField && (
							<div className='flex justify-center mt-2'>
								<Button
									size='sm'
									radius='sm'
									color='warning'
									variant='ghost'
									onClick={() => setShowCommentField(true)}>
									Deja tu comentario
								</Button>
							</div>
						)}
						<div className='flex justify-center mt-2'>
							<Button
								size='sm'
								radius='sm'
								className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
								variant='solid'
								type='submit'
								disabled={isSubmitting || loading}>
								Enviar
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
