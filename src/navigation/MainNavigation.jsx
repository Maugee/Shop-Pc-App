import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer} from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

import { useGetProfilePictureQuery } from "../services/userService";
import { setProfileImage, setUser } from "../features/authSlice";

import { fetchSession } from "../db";

const Stack = createNativeStackNavigator()

const MainNavigator = ()=>{

    const user = useSelector(state=> state.authSlice.value.email)
    const localId = useSelector(state=> state.authSlice.value.localId)

    dispatch = useDispatch()

    const {data: profileImage, error, isLoading } = useGetProfilePictureQuery(localId)

    useEffect(()=>{
        if(!user){
            (async ()=>{
                try{
                    const session = await fetchSession()
                    if(session.length){
                        dispatch(setUser(session[0]))
                    }
                }catch(error){
                    console.log("Error al obtener la sesión", error)
                }    
            })()
        }
    },[user])
    
    useEffect(()=>{
        if(profileImage){
            dispatch(setProfileImage(profileImage.image))
        }
    },[profileImage])

    return(
        <NavigationContainer>
        {
            user
            ?
            <TabNavigator/>
            :
            <AuthNavigator/>
        }
        </NavigationContainer>
    )
}

export default MainNavigator

