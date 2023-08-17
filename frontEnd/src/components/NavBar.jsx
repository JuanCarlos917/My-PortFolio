import { Link } from 'react-router-dom';
export const NavBar = () => {
	return (
		<div className='bg-green-emerald flex items-center justify-end px-4'>
			<p className='leading-normal text-3xl md:text-base font-light text-[#1a1919] font-rubik px-4'>
				<Link to='/about'>acerca de mi</Link>
			</p>
			<p className='leading-normal text-3xl md:text-base font-light text-[#1a1919] font-rubik px-4'>
				<Link to='/cv'>CV</Link>
			</p>
			<p className='leading-normal text-3xl md:text-base font-light text-[#1a1919] font-rubik px-4'>
				<Link to='/education'>Educacion</Link>
			</p>
			<p className='leading-normal text-3xl md:text-base font-light text-[#1a1919] font-rubik px-4'>
				<Link to='/dashboard'>Dashboard</Link>
			</p>
		</div>
	);
};
