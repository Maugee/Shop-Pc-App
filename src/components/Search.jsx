import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const Search = ({setSearch}) => {
    return (
        <View>
            <TextInput
            placeholder='Busca un producto'
            onChangeText={(text)=>setSearch(text)}
            style={styles.inputStyles}
            />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    inputStyles:{
        margin: 5,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        padding: 5,
        paddingLeft: 10
    }
})