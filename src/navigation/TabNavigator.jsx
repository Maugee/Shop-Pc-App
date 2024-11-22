import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"


import ShopNavigator from "./ShopNavigator"
import CartNavigator from "./CartNavigator"
import ReceiptsNavigator from "./ReceiptsNavigator"
import ProfileNavigator from "./ProfileNavigator"
import LocationNavigator from "./LocationNavigator"

import { Image } from "react-native"
import { useSelector } from "react-redux"

const Tab = createBottomTabNavigator()

const TabNavigator = () => {

    const profileImage = useSelector(state=> state.authSlice.value.profileImage)

    return (
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }}>
                <Tab.Screen
                    name="Shop"
                    component={ShopNavigator}
                    options={{
                        tabBarIcon: ({focused})=>(
                            <Icon name="store" size={30} color={focused?color="white":color="black"}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={CartNavigator}
                    options={{
                        tabBarIcon: ({focused})=>(
                            <Icon name="shopping-cart-checkout" size={30} color={focused?color="white":color="black"}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Receipts"
                    component={ReceiptsNavigator}
                    options={{
                        tabBarIcon: ({focused})=>(
                            <Icon name="receipt" size={30} color={focused?color="white":color="black"}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Location"
                    component={LocationNavigator}
                    options={{
                        tabBarIcon: ({focused})=>(
                            <Icon name="person-pin-circle" size={30} color={focused?color="white":color="black"}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Profiles"
                    component={ProfileNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            profileImage ? (
                                <Image 
                                    source={{ uri: profileImage }}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15, 
                                        borderWidth: focused ? 2 : 0,
                                        borderColor: focused ? 'white' : 'transparent',
                                    }}
                                />
                            ) : (
                                <Icon name="account-circle" size={30} color={focused ? "white" : "black"} />
                            )
                        )
                    }}
                />
            </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar: {
        height: 64,
        backgroundColor: "#ff850d"
    }
})

