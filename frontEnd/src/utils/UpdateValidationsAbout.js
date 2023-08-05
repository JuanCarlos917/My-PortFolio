import * as Yup from 'yup';

const FormValidationsUpdateAbout = Yup.object().shape({
	bio: Yup.string().required('Bio is required'),
	skills: Yup.object().shape({
		frontend: Yup.string().required('Frontend skills are required'),
		backend: Yup.string().required('Backend skills are required'),
		database: Yup.string().required('Database skills are required'),
	}),
});

export default FormValidationsUpdateAbout;

