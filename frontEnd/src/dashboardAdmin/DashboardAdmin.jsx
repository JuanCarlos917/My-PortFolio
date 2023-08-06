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
                <h3>Education</h3>
                <Link
                    className='block py-1 text-gray-800 hover:underline'
                    to='/dashboard/form-education'>
                    Form Education
                </Link>
                <Link
                    className='block py-1 text-gray-800 hover:underline'
                    to='/dashboard/update-education'>
                    Update Education
                </Link>
                <Link
                    className='block py-1 text-gray-800 hover:underline'
                    to='/dashboard/delete-education'>
                    Delete Education
                </Link>
			</div>
			<div className='flex-grow p-6'>
				<h1 className='text-3xl font-semibold'>Dashboard</h1>
				<Outlet />
			</div>
		</div>
	);
};
