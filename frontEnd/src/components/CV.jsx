import { PersonalInfo } from './PersonalInfo';
import { ProjectList } from './ProjectList';
import { ProfessionalExp } from './ProfessionalExp';
import { AboutMe } from './AboutMe';
import { Education } from './Education';

export const Cv = () => {
	return (
		<div className='container mx-auto p-10'>
			{/* Encabezado - Información Personal */}
			<div className='bg-[tuColorDestacado] p-10 rounded-lg shadow-lg text-black mb-10'>
				<h1 className='text-4xl font-volkhov mb-5'>
					Información Personal
				</h1>
				<PersonalInfo />
			</div>

			{/* Sobre Mí */}
			<div className='bg-white p-10 rounded-lg shadow-lg mb-10 relative overflow-hidden'>
				<h2 className='text-3xl font-volkhov mb-5'>Sobre Mí</h2>
				<AboutMe />
			</div>

			{/* Proyectos */}
			<div className='bg-white p-10 rounded-lg shadow-lg mb-10 relative overflow-hidden'>
				<h2 className='text-3xl font-volkhov mb-5'>Proyectos</h2>
				<ProjectList />
			</div>

			{/* Experiencia Profesional */}
			<div className='bg-white p-10 rounded-lg shadow-lg mb-10 relative overflow-hidden'>
				<h2 className='text-3xl font-volkhov mb-5'>
					Experiencia Profesional
				</h2>
				<ProfessionalExp />
			</div>

			{/* Educación */}
			<div className='bg-white p-10 rounded-lg mb-10 relative overflow-hidden'>
				<h2 className='text-3xl font-volkhov mb-5'>Educación</h2>
				<Education />
			</div>
		</div>
	);
};

