import * as Yup from 'yup';

const FormValidationsSignIn = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
});

export default FormValidationsSignIn;