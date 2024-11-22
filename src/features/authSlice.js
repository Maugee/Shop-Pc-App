import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: "auth",
    initialState:{
        value:{
            email:null,
            token: null,
            localId: "",
            profileImage: "",
        }
    },
    reducers: {
        setUser: (state, action)=>{
            state.value.email = action.payload.email,
            state.value.token = action.payload.idToken,
            state.value.localId = action.payload.localId
        },
        clearUser: (state)=>{
            state.value.email = null
            state.value.token = null
            state.value.localId =  ""
            state.value.profileImage =  ""
        },
        setProfileImage: (state, action)=>{
            state.value.profileImage = action.payload
        }
    }
})


export const { setUser, clearUser, setProfileImage } = authSlice.actions

export default authSlice.reducer
