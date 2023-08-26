import * as Yup from 'yup';

const FormValidationsResetP = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
});


export default FormValidationsResetP;
