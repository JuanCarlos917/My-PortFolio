import * as Yup from 'yup';

export const FormValidationsExp = Yup.object().shape({
	company: Yup.string().required('El nombre de la compañía es requerido'),
	description: Yup.string().required('La descripción es requerida'),
	position: Yup.string().required('La posición es requerida'),
	startYearMonth: Yup.string()
		.matches(/^\d{4}-\d{2}$/, 'El formato debe ser YYYY-MM')
		.required('El mes y año de inicio son requeridos'),
	endYearMonth: Yup.string()
		.matches(/^\d{4}-\d{2}$/, 'El formato debe ser a YYYY-MM')
});

export default FormValidationsExp;
