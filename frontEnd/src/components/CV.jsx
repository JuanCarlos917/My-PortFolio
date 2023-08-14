import { PersonalInfo } from './PersonalInfo';
import { ProjectList } from './ProjectList';
import { ProfessionalExp } from './ProfessionalExp';
import { AboutMe } from './AboutMe';
import { Education } from './Education';

export const Cv = () => {
	return (
		<div>
			<div>
				<PersonalInfo />
			</div>
			<div>
				<AboutMe />
			</div>
			<div>
				<ProjectList />
			</div>
			<div>
				<ProfessionalExp />
			</div>
			<div>
				<Education />
			</div>
		</div>
	);
};
