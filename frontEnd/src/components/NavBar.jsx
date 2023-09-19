import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

export const NavBar = () => {
	return (
		<div className='bg-white_bg flex items-center justify-between px-4 py-2 font-ysabeau'>
			<span className='inline-block w-60 h-60 relative overflow-hidden'>
				<Link to='/'>
					<img
						src={logo}
						alt='logo'
						className='absolute inset-0 w-full h-full object-cover'
					/>
				</Link>
			</span>
			<div className='flex items-center space-x-4'>
				<Link
					to='/'
					className='text-lg font-medium text-golden hover:text-gray-800 transition duration-200'>
					Home
				</Link>
				<Link
					to='/about'
					className='text-base font-light text-[#1a1919] hover:text-gray-600 transition duration-200'>
					Acerca de mí
				</Link>
				<Link
					to='/cv'
					className='text-base font-light text-[#1a1919] hover:text-gray-600 transition duration-200'>
					CV
				</Link>
				<Link
					to='/education'
					className='text-base font-light text-[#1a1919] hover:text-gray-600 transition duration-200'>
					Proyectos
				</Link>
			</div>
		</div>
	);
};
