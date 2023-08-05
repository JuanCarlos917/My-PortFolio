import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Link,
	Outlet,
} from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { AboutMe } from './components/AboutMe';
import { Dashboard } from './dashboardAdmin/DashboardAdmin';
import { FormAbout } from './dashboardAdmin/FormAbout';
import { UpdateAbout } from './dashboardAdmin/UpdateAbout';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<NavBar />} />
				<Route path='/about' element={<AboutMe />} />
				<Route path='/dashboard' element={<Dashboard />}>
					<Route path='form-about' element={<FormAbout />} />
					<Route path='update-about' element={<UpdateAbout />} />
				</Route>
			</Route>,
		),
	);
	return (
		<div className='App'>
			<RouterProvider router={router} />
		</div>
	);
}


const Root = () => {
	return (
		<>
			<div>
				<Link to='/'>{NavBar}</Link>
			</div>
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default App;
