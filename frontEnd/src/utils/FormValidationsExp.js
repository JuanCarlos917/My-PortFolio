import * as Yup from 'yup';

export const FormValidationsExp = Yup.object().shape({
	company: Yup.string().required('El nombre de la compañía es requerido'),
	description: Yup.string().required('La descripción es requerida'),
	position: Yup.string().required('La posición es requerida'),
	startDate: Yup.string().required('La fecha de inicio es requerida'),
	endDate: Yup.string().required('La fecha de finalización es requerida'),
});

export default FormValidationsExp;
