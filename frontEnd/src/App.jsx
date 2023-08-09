import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Link,
	Outlet,
} from 'react-router-dom';

//client
import { NavBar } from './components/NavBar';
import { AboutMe } from './components/AboutMe';
import { Education } from './components/Education';
import { Cv } from './components/CV';

//dashboard
import { Dashboard } from './dashboardAdmin/DashboardAdmin';
import { FormAbout } from './dashboardAdmin/about/FormAbout';
import { UpdateAbout } from './dashboardAdmin/about/UpdateAbout';
import { FormEducation } from './dashboardAdmin/education/FormEducation';
import { UpdateEducations } from './dashboardAdmin/education/UpdateEducation';
import { DeleteEducation } from './dashboardAdmin/education/DeleteEducation';
import { FormCV } from './dashboardAdmin/cv/FormCv';
import { AllEducations } from './dashboardAdmin/education/AllEducations';
import { UpdateCV } from './dashboardAdmin/cv/UpdateCv';
import { FormCategory } from './dashboardAdmin/category/FormCategory';
import { UpdateCategory } from './dashboardAdmin/category/UpdateCategory';
import { AllCategories } from './dashboardAdmin/category/AllCategories';
import { DeleteCategory } from './dashboardAdmin/category/DeleteCategory';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<NavBar />} />
				<Route path='/about' element={<AboutMe />} />
				<Route path='/education' element={<Education />} />
				<Route path='/cv' element={<Cv />} />
				<Route path='/dashboard' element={<Dashboard />}>
					<Route path='form-about' element={<FormAbout />} />
					<Route path='update-about' element={<UpdateAbout />} />
					<Route path='form-education' element={<FormEducation />} />
					<Route
						path='/dashboard/update-education/:id'
						element={<UpdateEducations />}
					/>
					<Route
						path='delete-education/:id'
						element={<DeleteEducation />}
					/>
					<Route path='all-education' element={<AllEducations />} />
					<Route path='form-cv' element={<FormCV />} />
					<Route path='update-cv' element={<UpdateCV />} />
					<Route path='form-category' element={<FormCategory />} />
					<Route
						path='update-category/:id'
						element={<UpdateCategory />}
					/>
					<Route path='all-categories' element={<AllCategories />} />
					<Route
						path='delete-category/:id'
						element={<DeleteCategory />}
					/>
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
