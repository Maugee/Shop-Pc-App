import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useLoginMutation } from '../services/authService'
import { setUser } from '../features/authSlice'
import { useDispatch } from 'react-redux'
import { insertSession, clearSessions } from '../db'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Toast from 'react-native-toast-message'

const LoginScreens = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [triggerLogin, result] = useLoginMutation()
    const [recordarme, setRecordarme] = useState(false)

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000
        });
    };

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(setUser(result.data))
            if (recordarme) {
                clearSessions().then(() => console.log("sesiones eliminadas")).catch(error => console.log("Error al eliminar las sesiones: ", error))
                console.log("result data:", result.data)
                insertSession({
                    localId: result.data.localId,
                    email: result.data.email,
                    token: result.data.idToken
                })
                    .then(res => console.log("Usuario insertado con éxito", res))
                    .catch(error => console.log("Error al insertar usuario", error))
            }
        }

        if (result.isError) {
            showToast("error", "Error al iniciar sesión. Intenta nuevamente.");
        }

    }, [result, recordarme])

    const onsubmit = () => {
        setErrorEmail('')
        setErrorPassword('')
        if (email === '') {
            setErrorEmail('Por favor, ingresa el email.');
        } 
        else if(password === ''){
            setErrorPassword('Por favor, ingresa la contraseña.');
        }
        else {
            triggerLogin({ email, password });
        }
    };
    dispatch = useDispatch()

    return (
        <View style={styles.viewLogin}>
            <Toast/>
            <Text style={styles.titulo}>INICIAR SESION</Text>
            <View>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholder='Email'
                    style={styles.emailInput}
                />
                {errorEmail && <Text style={styles.errorMessage}>{errorEmail}</Text>}
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Password'
                    style={styles.passwordInput}
                    secureTextEntry
                />
                {errorPassword && <Text style={styles.errorMessage}>{errorPassword}</Text>}
            </View>


            <View style={styles.recordar}>
                <Text style={styles.textRecordar}>Recordar Sesion</Text>
                {
                    recordarme
                        ?
                        <Pressable onPress={() => setRecordarme(!recordarme)}><Icon name='toggle-on' size={40} color="green" /></Pressable>
                        :
                        <Pressable onPress={() => setRecordarme(!recordarme)}><Icon name='toggle-off' size={40} color="red" /></Pressable>
                }
            </View>
            <View>
                <Pressable onPress={onsubmit}>
                    <Text style={styles.botonIniciar}>Iniciar Sesion</Text>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.botonCrear}>Crear Cuenta</Text>
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

export default LoginScreens

const styles = StyleSheet.create({
    viewLogin: {
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
        paddingLeft: 30
    },
    passwordInput: {
        padding: 5,
        backgroundColor: "white",
        marginHorizontal: 80,
        borderRadius: 40,
        paddingLeft: 30
    },
    botonIniciar: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 20,
        borderWidth: 2,
        marginHorizontal: 130,
    },
    botonCrear: {
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
    recordar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        gap: 15
    },
    textRecordar: {
        fontSize: 18,
    }
})