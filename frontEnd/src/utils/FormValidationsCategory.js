import * as Yup from 'yup';

const FormValidationsCategory = Yup.object().shape({
    name: Yup.string().required('Required'),
});
export default FormValidationsCategory;