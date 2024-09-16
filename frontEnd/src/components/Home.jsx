import { ServiceCard } from './ServiceCard';
import { ProjectCard } from './ProjectCard';
import { SocialLinks } from './SocialLinks';
import { ContactMe } from './ContactMe';
import { StarRatingForm } from './StarRatingForm';

export const Home = () => {
	return (
		<div>
			<div>
				<ServiceCard />
			</div>
			<div>
				<ProjectCard />
			</div>
			<div>
				<SocialLinks />
			</div>
			<div>
				<ContactMe />
			</div>
			<div>
				<StarRatingForm />
			</div>
		</div>
	);
};
