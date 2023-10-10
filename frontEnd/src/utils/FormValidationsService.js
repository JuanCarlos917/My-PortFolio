import * as Yup from 'yup';

const FormValidationsService = Yup.object().shape({
	name: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	price: Yup.number(),
	imageUrl: Yup.string()
		.matches(
			/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)(\?.*)?$/,
			'Enter correct URL',
		)
		.required('Required'),
});

export default FormValidationsService;
