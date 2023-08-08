import * as Yup from 'yup';

const FormValidationsAbout = Yup.object().shape({
	bio: Yup.string()
		.min(5, 'Bio debe tener al menos 5 caracteres')
		.required('Required'),
	skills: Yup.object({
		frontend: Yup.string().required('Required'),
		backend: Yup.string().required('Required'),
		database: Yup.string().required('Required'),
	}),
});

export default FormValidationsAbout;
