import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
	return (
		<div className='flex h-screen bg-gray-200'>
			<div className='p-6 bg-white w-64'>
				<h2 className='text-2xl font-semibold mb-5'>Menú</h2>
				<h3>About</h3>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/form-about'>
					Form About
				</Link>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/update-about'>
					Update About
				</Link>
				<h3>Contact</h3>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/form-cv'>
					Form Contact
				</Link>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/update-cv'>
					Update Contact
				</Link>
				<h3>Education</h3>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/form-education'>
					Form Education
				</Link>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/all-education'>
					Education List
				</Link>
				<h3>Professional Experience</h3>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/form-professionalExp'>
					Form Professional Experience
				</Link>
                <Link
                    className='block py-1 text-gray-800 hover:underline'
                    to='/dashboard/all-professionalExp'>
                    Professional Experience List
                </Link>
				<h3>Pojects</h3>
				<h4>Categories</h4>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/form-category'>
					Form Category
				</Link>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/all-categories'>
					Categories List
				</Link>
				<h4>Tags</h4>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/form-tag'>
					Form Tag
				</Link>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/all-tags'>
					Tags List
				</Link>
				<h4>Team Dev</h4>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/form-teamDevs'>
					Form Team Dev
				</Link>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/all-teamDevs'>
					Team Dev List
				</Link>
				<h4>New Poject</h4>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/form-project'>
					Form Project
				</Link>
				<Link
					className='block py-1 text-gray-800 hover:underline'
					to='/dashboard/all-projects'>
					Project List
				</Link>
			</div>
			<div className='flex-grow p-6'>
				<h1 className='text-3xl font-semibold'>Dashboard</h1>
				<Outlet />
			</div>
		</div>
	);
};
