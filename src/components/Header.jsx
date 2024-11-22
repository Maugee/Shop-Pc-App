import { StyleSheet, Text, View, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Header = ({subtitle}) => {

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Shop Components</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header:{
        paddingTop: 60,
        backgroundColor: "#ff850d",
    },
    title:{
        color: "white",
        fontSize: 20,
        textTransform: "uppercase",
        textAlign: "center"
    },
    subtitle:{
        color: "white",
        fontSize: 18,
        textAlign: "center",
        paddingBottom: 20
    },
    logOut:{
        alignItems: "flex-end",
        marginHorizontal: 15,
        paddingBottom: 10
    }
})