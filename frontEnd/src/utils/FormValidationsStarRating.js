import * as Yup from 'yup';

const FormValidationsStarRating = Yup.object().shape({
    starRating: Yup.string().required('Required'),
    comment: Yup.string().required('Required'),
});

export default FormValidationsStarRating;