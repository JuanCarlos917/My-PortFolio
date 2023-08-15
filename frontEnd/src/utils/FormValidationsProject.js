import * as  Yup from 'yup'

const FormValidationsProject = Yup.object().shape({
	title: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	technologies: Yup.string().required('Required'),
	url: Yup.string().required('Required'),
	image: Yup.string().required('Required'),
});
export default FormValidationsProject