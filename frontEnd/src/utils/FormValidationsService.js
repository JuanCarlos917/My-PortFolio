import * as Yup from 'yup';

const FormValidationsService = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number()
});

export default FormValidationsService;