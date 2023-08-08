import * as Yup from 'yup';

const FormValidationsCV = Yup.object().shape({
    name: Yup.string().required('Required'),
    proyects: Yup.object().shape({
        proyect1: Yup.string().required('Required'),
        proyect2: Yup.string().required('Required'),
        proyect3: Yup.string().required('Required'),
        proyect4: Yup.string().required('Required'),
    }),
    experience: Yup.object().shape({
        experience1: Yup.string().required('Required'),
        experience2: Yup.string().required('Required'),
    }),
});
export default FormValidationsCV;
