import * as Yup from 'yup';

const FormValidationsEduca = Yup.object().shape({
	degree: Yup.string().required('Required'),
	description: Yup.string()
		.min(5, 'Bio debe tener al menos 5 caracteres')
		.required('Required'),
	institution: Yup.string().required('Required'),
	field_of_study: Yup.string().required('Required'),
	startDate: Yup.string().required('Required'),
	endDate: Yup.string().required('Required'),
});

export default FormValidationsEduca;