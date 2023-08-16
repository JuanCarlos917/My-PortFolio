import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

export const Logout = () => {
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(logoutUser());
	};

	return (
		<div>
			<button onClick={logout}>Logout</button>
		</div>
	);
};
