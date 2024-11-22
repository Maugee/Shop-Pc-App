import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useSignupMutation } from '../services/authService'
import { setUser } from '../features/authSlice'
import { useDispatch } from 'react-redux'
import { validationSchema } from '../validations/validationSchema'


const SignUpScreens = ({ navigation}) => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

    const [trigerSingUp, result] = useSignupMutation()

    dispatch = useDispatch()

    useEffect(() => {
        if (result.status === "fulfilled") {
            dispatch(setUser(result.data))
        }
        else if (result.status === "rejected") {

        }
    }, [result])


    const onsubmit = () => {
        try {
            validationSchema.validateSync({ email, password, passwordConfirm })
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            trigerSingUp({ email, password })
        }
        catch (error) {
            switch (error.path) {
                case "email":
                    console.log(error.message)
                    setErrorEmail(error.message)
                    break
                case "password":
                    console.log(error.message)
                    setErrorPassword(error.message)
                    break
                case "passwordConfirm":
                    console.log(error.message)
                    setErrorConfirmPassword(error.message)
                    break
            }
        }
    }


    return (
        <View style={styles.viewSignUp}>
            <Text style={styles.titulo}>REGISTRARSE</Text>
            <View>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholder='Email'
                    style={styles.emailInput}
                />
                {(errorEmail && !errorConfirmPassword) && <Text style={styles.error}>{errorEmail}</Text>}
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Password'
                    style={styles.passwordInput}
                    secureTextEntry
                />
                {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
                <TextInput
                    onChangeText={(text) => setPasswordConfirm(text)}
                    placeholder='ConfirmPassword'
                    style={styles.passwordInput}
                    secureTextEntry
                />
                {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
            </View>
            <View>
                <Pressable onPress={onsubmit}>
                    <Text style={styles.botonCrear}>Crear Cuenta</Text>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.botonIniciar}>Iniciar Sesion</Text>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={() => dispatch(setUser({ email: "cuentaDemo@componentsShop.com", token: "demo" }))}>
                    <Text style={styles.botonInvitado}>Ingresar como invitado</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default SignUpScreens

const styles = StyleSheet.create({
    viewSignUp: {
        backgroundColor: "#D4D2D5",
        width: "100%",
        height: "100%",
        justifyContent: "center"
    },
    titulo: {
        fontSize: 20,
        marginBottom: 50,
        textAlign: "center"
    },
    emailInput: {
        padding: 5,
        backgroundColor: "white",
        marginHorizontal: 80,
        borderRadius: 40,
        marginBottom: 10,
        paddingLeft: 30,
    },
    passwordInput: {
        padding: 5,
        backgroundColor: "white",
        marginHorizontal: 80,
        borderRadius: 40,
        paddingLeft: 30,
        marginBottom: 10
    },
    botonCrear: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 20,
        borderWidth: 2,
        marginHorizontal: 130,
    },
    botonIniciar: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        textTransform: "uppercase",
        marginHorizontal: 140,
        textDecorationLine: "underline",
    },
    botonInvitado: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        textTransform: "uppercase",
        marginHorizontal: 100,
        textDecorationLine: "underline"
    },
    error:{
        color: "red",
        textAlign: "center",
        fontSize: 16
    }

})