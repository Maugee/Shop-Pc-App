import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { useState } from 'react'
import CameraIcon from '../components/CameraIcon'

import { useSelector, useDispatch } from 'react-redux'
import { setProfileImage } from '../features/authSlice'
import * as ImagePicker from "expo-image-picker"
import { useProfilePictureMutation } from '../services/userService'

import { clearUser } from '../features/authSlice'
import { clearSessions } from '../db'

const ProfileScreens = () => {

    const userLogOut = useSelector(state=> state.authSlice.value.email)

    const onLogOut = ()=>{
        dispatch(clearUser())
        clearSessions()
        .then()
        .catch()
    }

    const image = useSelector(state=> state.authSlice.value.profileImage)
    const user = useSelector(state=> state.authSlice.value.email)
    const localId = useSelector(state=> state.authSlice.value.localId)

    const [triggerProfilePicture, result] = useProfilePictureMutation()

    const verifyPermisions = async ()=>{
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted) return false
        return true
    }

    dispatch = useDispatch()

    const pickImage = async ()=>{
        const permisionOk = await verifyPermisions()
        if(permisionOk){
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1,1],
                base64: true,
                quality: 0.5
            })
            if(!result.canceled){
                dispatch(setProfileImage(`data:image/jpeg;base64,${result.assets[0].base64}`))
                triggerProfilePicture({image: `data:image/jpeg;base64,${result.assets[0].base64}`, localId })
            }
        }
        else{

        }
    }


    return (
        <View style={styles.viewPerfil}>
        <View style={styles.contenidoPerfil}>
            {
                image
                    ?
                    <Image source={{ uri: image }} resizeMode='cover' style={styles.imgPerfil} />
                    :
                    <Text style={styles.inicialNombre}>{user.charAt(0).toUpperCase()}</Text>
            }
            <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.camaraFoto]} >
                <CameraIcon />
            </Pressable>
        </View>
        <Text style={styles.email}>Email:  {user}</Text>
        <Pressable style={styles.cerrar} onPress={onLogOut}><Text style={styles.cerrarSesion}>Cerrar Sesion</Text></Pressable>
    </View>
    )
}

export default ProfileScreens

const styles = StyleSheet.create({
    viewPerfil: {
        marginTop: 80,
        alignItems: 'center'
    },
    contenidoPerfil: {
        width: 120,
        height: 120,
        borderRadius: 120,
        backgroundColor: "#ff850d",
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgPerfil: {
        width: 120,
        height: 120,
        borderRadius: 120,
    },
    inicialNombre: {
        color: "white",
        fontSize: 50,
    },
    camaraFoto: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    email: {
        marginTop: 20,
        fontSize: 16,
    },
    cerrarSesion:{
        color: "white",
        fontSize: 20,
        textTransform: "uppercase"
    },
    cerrar:{
        marginTop: 350,
        backgroundColor: "red",
        borderRadius: 5,
        padding: 10
    }
})