import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const FiltradoProducts = ({productFilteredByCategory, productFiltered, setProductFiltered, setSearch}) => {

    const filtradoPorPrecioMenor = ()=>{
        const filtradoPrecioMenor = productFiltered.filter(product=> product.price <= 1510000)
        if(filtradoPrecioMenor.length > 0){
            setProductFiltered(filtradoPrecioMenor)
        }else{
            setProductFiltered(productFilteredByCategory)
        }
    }

    const filtradoPorPrecioMayor = ()=>{
        const filtradoPrecioMayor = productFiltered.filter(product=> product.price >= 1520000)
        if(filtradoPrecioMayor.length > 0){
            setProductFiltered(filtradoPrecioMayor)
        }else{
            setProductFiltered(productFilteredByCategory)
        }
    }

    const borrarFiltro = ()=>{
        setProductFiltered(productFilteredByCategory)
        setSearch("")
    }

    return (
        <>
            <Pressable onPress={filtradoPorPrecioMenor} style={styles.filtrados}>
                <Icon name='radio-button-unchecked' size={16} />
                <Text style={styles.textfiltrados}>Precio Menor $1.510.000</Text>
            </Pressable>

            <Pressable onPress={filtradoPorPrecioMayor} style={styles.filtrados}>
                <Icon name='radio-button-unchecked' size={16} />
                <Text style={styles.textfiltrados}>Precio Mayor $1.520.000</Text>
            </Pressable>

            <Pressable onPress={borrarFiltro} style={styles.filtrados}>
                <Icon name='radio-button-unchecked' size={16} />
                <Text style={styles.textfiltrados}>Borrar Filtros</Text>
            </Pressable>
        </>
    )
}

export default FiltradoProducts

const styles = StyleSheet.create({
    filtrados:{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 30,
        gap: 10
    },
    textfiltrados:{
        fontSize: 18
    }
})