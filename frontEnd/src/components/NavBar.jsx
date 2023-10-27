import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuToggle,
} from '@nextui-org/react';
import logo from '../assets/images/logoDark.svg';

export const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuItems = [
		{
			label: 'Menu',
		},
		{ label: 'Inicio', path: '/home' },
		{ label: 'Mi Historia', path: '/about' },
		{ label: 'Ruta Profesional', path: '/cv' },
		{ label: 'Mis Obras', path: '/projects' },
		{ label: 'Contáctame 🤙', path: '/contact' },
	];

	const menuItemsMax = [
		{ label: 'Inicio', path: '/home' },
		{ label: 'Mi Historia', path: '/about' },
		{ label: 'Ruta Profesional', path: '/cv' },
		{ label: 'Mis Obras', path: '/projects' },
		{ label: 'Contáctame 🤙', path: '/contact' },
	];

	return (
		<Navbar shouldHideOnScroll className='font-sf pt-0'>
			<NavbarBrand className='w-40 h-40 relative overflow-hidden flex items-center'>
				<Link to='/'>
					<img
						src={logo}
						alt='logo'
						className='w-16 h-16 object-cover'
					/>
				</Link>
			</NavbarBrand>

			<NavbarContent className='sm:hidden' justify='end'>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				/>
			</NavbarContent>

			<NavbarContent
				className='hidden md:flex gap-4 font-sf'
				justify='center'>
				{menuItemsMax.map((item, index) => (
					<NavbarItem key={index} isActive={item.label === 'Inicio'}>
						<Link
							to={item.path}
							className={`w-full transition duration-300 font-sf ${
								item.label === 'Contáctame 🤙'
									? 'hover:text-soft_green'
									: 'hover:text-golden'
							}`}>
							{item.label}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			<NavbarMenu isOpen={isMenuOpen}>
				{menuItems.map((item, index) => (
					<NavbarItem
						key={`${item}-${index}`}
						isActive={item.label === 'Menu'}>
						<Link
							to={item.path}
							className={`w-full transition duration-300 font-sf ${
								item.label === 'Contáctame 🤙'
									? 'hover:text-soft_green'
									: 'hover:text-golden'
							}`}>
							{item.label}
						</Link>
					</NavbarItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};
