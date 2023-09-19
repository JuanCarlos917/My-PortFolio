import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

export const NavBar = () => {
	return (
		<div className='bg-white_bg flex items-center justify-between px-4 py-2 font-aboreto mt-[-40px]'>
			<span className='inline-block w-40 h-40 relative overflow-hidden'>
				<Link to='/'>
					<img
						src={logo}
						alt='logo'
						className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 object-cover'
					/>
				</Link>
			</span>
			<div className='flex items-center space-x-4'>
				<Link
					to='/home'
					className='text-lg font-medium text-black hover:text-gray-800 transition duration-200'>
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
					to='/projects'
					className='text-base font-light text-[#1a1919] hover:text-gray-600 transition duration-200'>
					Proyectos
				</Link>
			</div>
		</div>
	);
};
