import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreens, SignUpScreens } from "../screens";

const Stack = createNativeStackNavigator()

const AuthNavigator = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreens}/>
            <Stack.Screen name="SignUp" component={SignUpScreens}/>
        </Stack.Navigator>
    )
}

export default AuthNavigator