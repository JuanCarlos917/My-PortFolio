import * as Yup from 'yup';

const FormValidationsForgotP = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
});

export default FormValidationsForgotP;