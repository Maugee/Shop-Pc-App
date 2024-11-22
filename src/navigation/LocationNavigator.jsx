import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header"
import LocationScreens from "../screens/LocationScreens";

const Stack = createNativeStackNavigator()

const LocationNavigator = ()=>{
    return(
        <Stack.Navigator
        screenOptions={{
            header: ({route})=><Header subtitle={route.name}/>
        }}>
            <Stack.Screen name="Ubicacion" component={LocationScreens}/>
        </Stack.Navigator>
    )
}

export default LocationNavigator