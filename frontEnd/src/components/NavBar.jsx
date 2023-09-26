import { Link } from 'react-router-dom';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react';
import logo from '../assets/images/logo.svg';

export const NavBar = () => {
	return (
		<Navbar shouldHideOnScroll className='font-ysabeau pt-0'>
			<NavbarBrand
				className='w-40 h-40 relative overflow-hidden flex items-center
            '>
				<Link to='/'>
					<img
						src={logo}
						alt='logo'
						className='w-16 h-16 object-cover'
					/>
				</Link>
			</NavbarBrand>

			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				<NavbarItem isActive className='text-Dark_Navy_Blue'>
					<Link
						to='/home'
						className='hover:text-golden transition duration-300'>
						Home
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						to='/about'
						className='hover:text-golden transition duration-300'>
						Acerca de mí
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						to='/cv'
						className='hover:text-golden transition duration-300'>
						CV
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						to='/projects'
						className='hover:text-golden transition duration-300'>
						Proyectos
					</Link>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
