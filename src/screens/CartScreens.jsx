import { StyleSheet, Text, View, FlatList, Image, Pressable, ActivityIndicator } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { usePostReceiptMutation } from '../services/receiptsServices'

import { clearCart } from '../features/CartSlice'
import { removeItem } from '../features/CartSlice'


const CartScreens = ({navigation}) => {

    const cart = useSelector(state=> state.cartSlice.value.cartItems)
    const total = useSelector(state=> state.cartSlice.value.total)
    const remove = useSelector(state => state.cartSlice.value.removeItem)

    const [triggerPost, result] = usePostReceiptMutation()
    const dispatch = useDispatch()


    if(cart.length === 0){
        return(
            <View style={styles.cartVacio}>
            <Text style={styles.textCart}>El carrito esta vacio</Text>
            <ActivityIndicator color="#ff850d"/>
            </View>
        )
    }


    const FooterComponent= ()=>(
            <View style={styles.viewFinal}>
                <Text style={styles.precioFinal}>Total: ${total}</Text>
                <Pressable onPress={()=>{
                    triggerPost({cart, total, createdAd: Date.now()})
                    dispatch(clearCart())
                    navigation.navigate("Receipts")
                }}>  
                <Text style={styles.confirmarCompra}>Confirmar</Text>
                </Pressable>
                <Pressable onPress={()=> navigation.navigate("Categorias")}>
                    <Text style={styles.seguirComprando}>Quieres seguir Comprando?</Text>
                </Pressable>
            </View>
        )


    const renderCartItem= ({item})=>{
        return(
            <>
            <View style={styles.viewProductoCart}>
                <Pressable style={styles.delete} onPress={()=> dispatch(removeItem(item.id))}>
                    <Icon name="delete-sweep" size={30} color={color="red"}/>
                </Pressable>
                <Image source={{uri: item.mainImage}} resizeMode='contain' style={styles.imgCart}/>
                <Text style={styles.nameProduct}>Producto: {item.title}</Text>
                <Text style={styles.descripcionProduct}>Descripcion: {item.shortDescription}</Text>
                <Text style={styles.priceProduct}>Precio c/u: ${item.price}</Text>
                <Text style={styles.cantidadProduct}>Cantidad: {item.quantity}</Text>
                <Text style={styles.totalProduct}>Total: ${item.quantity * item.price}</Text>
            </View>      
            </>
        )
    }

    return (
        <FlatList
        data={cart}
        keyExtractor={item=> item.id}
        renderItem={renderCartItem}
        ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu Carrito: </Text>}
        ListFooterComponent={<FooterComponent/>}
        />
    )
}

export default CartScreens

const styles = StyleSheet.create({
    viewProductoCart:{
        backgroundColor: "#DCDDDE",
        marginHorizontal: 30,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10,
        paddingHorizontal: 10
    },
    nameProduct:{
        fontSize: 18,
        marginVertical: 5
    },
    descripcionProduct:{
        fontSize: 18,
        marginVertical: 5
    },
    priceProduct:{
        fontSize: 18,
        marginVertical: 5
    },
    cantidadProduct:{
        fontSize: 18,
        marginVertical: 5
    },
    totalProduct:{
        fontSize: 18,
        marginVertical: 5
    },
    imgCart:{
        width: 200,
        height: 200,
        alignSelf: "center",
        borderRadius: 20
    },
    delete:{
        alignItems: "flex-end",
        marginHorizontal: 15,
        marginTop: 10
    },
    precioFinal:{
        marginTop: 40,
        textAlign: "center",
        fontSize: 18
    },
    confirmarCompra:{
        textAlign: "center",
        fontSize: 20,
        backgroundColor: "#ff850d",
        color: "white",
        borderRadius: 20,
        marginHorizontal: 50,
        marginTop: 20,
    },
    viewFinal:{
        backgroundColor: "#ffe9c3",
        marginTop: 20,
        paddingBottom: 40,
        marginBottom: 50,
        marginHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black'
    },
    seguirComprando:{
        textAlign: "center",
        marginTop: 10,
        fontSize: 16,
    },
    cartVacio:{
        marginTop : "70%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    textCart:{
        fontSize: 20,
        textTransform: "uppercase",
        paddingRight: 10
    }
})