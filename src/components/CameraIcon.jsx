import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const CameraIcon = () => {
    return (
        <View style={styles.camera}>
            <Icon name='party-mode' size={24} color="white"/>
        </View>
    )
}

export default CameraIcon

const styles = StyleSheet.create({
    camera:{
        backgroundColor: "black",
        borderRadius: 30,
        padding: 10,
        marginRight: 5
    }
})