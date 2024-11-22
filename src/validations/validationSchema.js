import { object, string, ref } from "yup";

export const validationSchema = object({
    passwordConfirm:
        string()
        .required("La contraseña no puede estar vacia")
        .oneOf([ref('password'),null],"Las contraseñas deben coincidir"),
    password:
        string()
        .required("La contraseña no puede estar vacia")
        .min(6, "La contraseña debe tener minimos 6 caracteres"),
        email:
        string()
        .required("El email no puede estar vacio")
        .email("Por favor, introduce un email valido")
})