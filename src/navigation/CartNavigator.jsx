import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CartScreens from "../screens/CartScreens"

const CartStack = createNativeStackNavigator()

const CartNavigator = () => {
    return (
        <CartStack.Navigator>
            <CartStack.Screen name="Carrito" component={CartScreens}/>
        </CartStack.Navigator>
    )
}

export default CartNavigator

