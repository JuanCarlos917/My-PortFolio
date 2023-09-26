import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { Button } from '@nextui-org/react';

export const Logout = () => {
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(logoutUser());
	};

	return (
		<div className='flex items-center justify-left pb-8'>
			<Button
				size='sm'
				radius='sm'
				color='danger'
				variant='ghost'
				onClick={logout}>
				Logout
			</Button>
		</div>
	);
};
