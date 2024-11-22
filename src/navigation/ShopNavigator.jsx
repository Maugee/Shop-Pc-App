import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { CategoriesScreens, ProductsScreens, ProductScreens } from "../screens"
import Header from "../components/Header"

const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
    return (
            <Stack.Navigator 
                screenOptions={{
                    header: ({route})=><Header subtitle={route.name}/>
                }}>
                <Stack.Screen name="Categorias" component={CategoriesScreens}/>
                <Stack.Screen name="Productos" component={ProductsScreens}/>
                <Stack.Screen name="Producto" component={ProductScreens}/>
            </Stack.Navigator>
    )
}

export default ShopNavigator
