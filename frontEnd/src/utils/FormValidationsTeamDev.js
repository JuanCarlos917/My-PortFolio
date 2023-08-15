import * as Yup from 'yup'

const FormValidationsTeamDev = Yup.object().shape({
    name: Yup.string()
        .min(2, 'El nombre es muy corto')
        .max(50, 'El nombre es muy largo')
        .required('El nombre es obligatorio'),
    email: Yup.string()
        .email('El email no es válido')
        .required('El email es obligatorio'),
    social_network: Yup.string()
        .url('La URL no es válida')
        .required('La URL es obligatoria')
})

export default FormValidationsTeamDev
