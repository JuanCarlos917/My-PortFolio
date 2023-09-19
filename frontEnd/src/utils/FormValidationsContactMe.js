import * as Yup from 'yup';

const FormValidationsContactMe = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    message: Yup.string().required('Required'),
});

export default FormValidationsContactMe;