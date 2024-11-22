import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ReceiptsScreens from "../screens/ReceiptsScreens"

const ReceiptsStack = createNativeStackNavigator()

const ReceiptsNavigator = () => {
    return (
        <ReceiptsStack.Navigator>
            <ReceiptsStack.Screen name="Recibos" component={ReceiptsScreens}/>
        </ReceiptsStack.Navigator>
    )
}

export default ReceiptsNavigator

