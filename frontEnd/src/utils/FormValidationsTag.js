import * as Yup from 'yup';

const FormValidationsTag = Yup.object().shape({
    name: Yup.string().required('Required'),
});

export default FormValidationsTag;