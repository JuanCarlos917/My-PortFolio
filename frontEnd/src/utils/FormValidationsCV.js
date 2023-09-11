import * as Yup from 'yup';

const FormValidationsCV = Yup.object().shape({
	name: Yup.string().required('Required'),
	lastName: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	phone: Yup.string().required('Required'),
	social_media: Yup.object({
		linkedin: Yup.string().required('Required'),
		github: Yup.string().required('Required'),
	}),
	imageUrl: Yup.string().required('Required'),
});
export default FormValidationsCV;
