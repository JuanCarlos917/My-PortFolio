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
import { Education } from './components/Education';
import { Dashboard } from './dashboardAdmin/DashboardAdmin';
import { FormAbout } from './dashboardAdmin/about/FormAbout';
import { UpdateAbout } from './dashboardAdmin/about/UpdateAbout';
import { FormEducation } from './dashboardAdmin/education/FormEducation';
import { UpdateEducation } from './dashboardAdmin/education/UpdateEducation';
import { DeleteEducation } from './dashboardAdmin/education/DeleteEducation';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<NavBar />} />
				<Route path='/about' element={<AboutMe />} />
                <Route path='/education' element={<Education />} />
				<Route path='/dashboard' element={<Dashboard />}>
					<Route path='form-about' element={<FormAbout />} />
					<Route path='update-about' element={<UpdateAbout />} />
                    <Route path='form-education' element={<FormEducation />} />
                    <Route path='update-education' element={<UpdateEducation />} />
                    <Route path='delete-education' element={<DeleteEducation />} />
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
