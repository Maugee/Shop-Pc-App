import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreens from "../screens/ProfileScreens"
import Header from "../components/Header"

const ProfileStack = createNativeStackNavigator()


const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator  screenOptions={{ header: ({route})=><Header subtitle={route.name}/>}}>
            <ProfileStack.Screen name="Perfil" component={ProfileScreens}/>
        </ProfileStack.Navigator>
    )
}

export default ProfileNavigator
