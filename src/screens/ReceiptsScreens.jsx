import { StyleSheet, Text, View, FlatList, Image } from 'react-native'

// import receipts from "../data/receipts.json"
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useGetReceiptsQuery } from '../services/receiptsServices'
import { usePostReceiptMutation } from '../services/receiptsServices'

import { useEffect } from 'react'

const ReceiptsScreens = () => {

    const { data: receipts, error, isLoading } = useGetReceiptsQuery();

    

    useEffect(()=>{
        if (isLoading) {
            console.log("Cargando los recibos...");
        } else if (error) {
            console.log("Error al cargar los recibos:", error);
        } else {
            console.log("Recibos cargados:", receipts);
        }
    }, [receipts, error, isLoading]);

    const renderReceiptItem = ({item})=>{
        // let total = item.items.reduce((acumulador, item)=> (acumulador+= item.quantity * item.price), 0)
        return(
            <View>
                <Text>Recibo nro: {item.id}</Text>
                <Text>Creado el: {new Date(item.createdAd).toLocaleString('es-AR')} </Text>
                <Text>Total: {item.total}</Text>
                <Icon name="visibility" size={24} color={color="gray"} />
            </View>
        )
    }

    return (
            <FlatList
            data={receipts}
            keyExtractor={item=>  item.id ? item.id : item.createdAt}
            renderItem={renderReceiptItem}
            />
    )
}

export default ReceiptsScreens
