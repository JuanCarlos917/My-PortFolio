import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Outlet,
	useMatch,
} from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';

//client
import { NavBar } from './components/NavBar';
import { AboutMe } from './components/AboutMe';
import { Education } from './components/Education';
import { Cv } from './components/CV';

//dashboard
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { Logout } from './components/Logout';

import { Dashboard } from './dashboardAdmin/DashboardAdmin';
import { FormAbout } from './dashboardAdmin/about/FormAbout';
import { UpdateAbout } from './dashboardAdmin/about/UpdateAbout';
import { FormEducation } from './dashboardAdmin/education/FormEducation';
import { UpdateEducations } from './dashboardAdmin/education/UpdateEducation';
import { DeleteEducation } from './dashboardAdmin/education/DeleteEducation';
import { AllEducations } from './dashboardAdmin/education/AllEducations';
import { FormCV } from './dashboardAdmin/cv/FormCv';
import { UpdateCV } from './dashboardAdmin/cv/UpdateCv';
import { FormCategory } from './dashboardAdmin/category/FormCategory';
import { UpdateCategory } from './dashboardAdmin/category/UpdateCategory';
import { AllCategories } from './dashboardAdmin/category/AllCategories';
import { DeleteCategory } from './dashboardAdmin/category/DeleteCategory';
import { FormTag } from './dashboardAdmin/tag/FormTag';
import { UpdateTags } from './dashboardAdmin/tag/UpdateTags';
import { AllTags } from './dashboardAdmin/tag/AllTags';
import { DeleteTag } from './dashboardAdmin/tag/DeleteTag';
import { FormTeamDevs } from './dashboardAdmin/teamDevs/FormTeamDevs';
import { UpdateTeamDevs } from './dashboardAdmin/teamDevs/UpdateTeamDevs';
import { AllTeamDevs } from './dashboardAdmin/teamDevs/AllTeamDevs';
import { DeleteTeamDevs } from './dashboardAdmin/teamDevs/DeleteTeamDevs';
import { FormProject } from './dashboardAdmin/project/FormProject';
import { AllProjects } from './dashboardAdmin/project/AllProjects';
import { FormExperience } from './dashboardAdmin/professionalExp/FormExperience';
import { UpdateExperience } from './dashboardAdmin/professionalExp/UpdateExperience';
import { AllExperiences } from './dashboardAdmin/professionalExp/AllExperiences';
import { DeleteExperience } from './dashboardAdmin/professionalExp/DeleteExperience';
import { UpdateProjects } from './dashboardAdmin/project/UpdateProject';
import { DeleteProject } from './dashboardAdmin/project/DeleteProject';
import { ImageList } from './dashboardAdmin/s3Media/ImageList';
import { UploadImage } from './dashboardAdmin/s3Media/ImageUpload';
import { DeleteImage } from './dashboardAdmin/s3Media/ImageDelete';
import { GenerateUrl } from './dashboardAdmin/s3Media/UrlImageS3';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<NavBar />} />
				<Route path='/about' element={<AboutMe />} />
				<Route path='/education' element={<Education />} />
				<Route path='/cv' element={<Cv />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/login' element={<Login />} />
				<Route path='/logout' element={<Logout />} />
				{/* Dashboard */}
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							{' '}
							<Dashboard />
						</ProtectedRoute>
					}>
					{/* <Route index element={<Dashboard />} /> */}
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
					<Route path='form-tag' element={<FormTag />} />
					<Route path='update-tag/:id' element={<UpdateTags />} />
					<Route path='all-tags' element={<AllTags />} />
					<Route path='delete-tag/:id' element={<DeleteTag />} />
					<Route path='form-teamDevs' element={<FormTeamDevs />} />
					<Route
						path='update-teamDevs/:id'
						element={<UpdateTeamDevs />}
					/>
					<Route path='all-teamDevs' element={<AllTeamDevs />} />
					<Route
						path='delete-teamDev/:id'
						element={<DeleteTeamDevs />}
					/>
					<Route path='form-project' element={<FormProject />} />
					<Route path='all-projects' element={<AllProjects />} />
					<Route
						path='update-projects/:id'
						element={<UpdateProjects />}
					/>
					<Route
						path='delete-project/:id'
						element={<DeleteProject />}
					/>
					<Route
						path='form-professionalExp'
						element={<FormExperience />}
					/>
					<Route
						path='all-professionalExp'
						element={<AllExperiences />}
					/>
					<Route
						path='update-experience/:id'
						element={<UpdateExperience />}
					/>
					<Route
						path='delete-professionalExp/:id'
						element={<DeleteExperience />}
					/>
					<Route path='image-list' element={<ImageList />} />
					<Route path='upload-image' element={<UploadImage />} />
					<Route path='delete-image' element={<DeleteImage />} />
					<Route path='generate-url' element={<GenerateUrl />} />
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
	const match = useMatch('/dashboard/*');
	if (!match) {
		return (
			<>
				<NavBar />
				<div>
					<Outlet />
				</div>
			</>
		);
	} else {
		return (
			<>
				<div>
					<Outlet />
				</div>
			</>
		);
	}
};

export default App;
