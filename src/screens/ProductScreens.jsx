import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../features/CartSlice'
import { useGetProductByIdQuery} from '../services/shopService'

import { setUser } from "../features/authSlice"


const ProductScreens = ({navigation}) => {

    const productId = useSelector(state => state.shopSlice.value.productId)

    const { data: productFound, error, isLoading } = useGetProductByIdQuery(productId)

    const dispatch = useDispatch()

    return (
        <>
            {
                isLoading
                    ?
                    <ActivityIndicator size="large" color="blue" />
                    :
                    error
                        ?
                        <Text>Error al cargar el producto</Text>
                        :
                        <View>
                        <View style={styles.goBack}>
                            <Pressable onPress={() => navigation.navigate("Categorias")}><Icon name='home' size={30} color="#ff850d"/></Pressable>
                            <Pressable onPress={() => navigation.navigate("Productos")}><Text style={styles.categoriaAnterior}> / {productFound.category}</Text></Pressable>
                            <Text style={styles.dondeEstoy}> / Producto</Text>
                        </View>
                        
                            {
                                productFound.stock <= 0 
                                ? 
                                <Image source={{ uri: productFound.mainImage }} resizeMode='contain' style={styles.imgProductSinStock} />
                                :  
                                <Image source={{ uri: productFound.mainImage }} resizeMode='contain' style={styles.imgProductConStock}/> 
                            }
                            <Text style={styles.title}>{productFound.title}</Text>
                            <Text style={styles.description}>{productFound.shortDescription}</Text>
                            <Text style={styles.price}>Precio: ${productFound.price}</Text>
                            {
                                productFound.discount > 0 && <View style={styles.viewDescuento}><Text style={styles.d}>Descuento: </Text><Text style={styles.descuento}>{productFound.discount}%</Text></View>
                            }
                            {
                                productFound.stock <= 0 && <View><Text style={styles.stock}>Sin Stock</Text></View>
                            }
                            {
                                setUser === "demo"
                                ?
                                <Pressable style={styles.viewComprarButton} onPress={()=>navigation.navigate("Login")}>
                                    <Text style={styles.buttonIniciarCompra}>Para comprar debes</Text><Text style={styles.buttonIniciarSesionCompra}>Inciar sesion</Text>
                                </Pressable>
                                :
                                productFound.stock > 0 && <Pressable onPress={() => dispatch(addItem({ ...productFound, quantity: 1 }))} style={({ pressed }) => [{ opacity: pressed ? 0.60 : 1 }, styles.buttonConfirm]} ><Text style={styles.textConfirm}>Agregar al carrito</Text></Pressable>
                            }
                            {/* {
                                productFound.stock > 0 && <Pressable onPress={() => dispatch(addItem({ ...productFound, quantity: 1 }))} style={({ pressed }) => [{ opacity: pressed ? 0.60 : 1 }, styles.buttonConfirm]} ><Text style={styles.textConfirm}>Agregar al carrito</Text></Pressable>
                            } */}
                        </View>
            }
        </>
    )
}

export default ProductScreens

const styles = StyleSheet.create({
    imgProductSinStock: {
        width: 200,
        height: 200,
        alignSelf: "center",
        opacity: 0.1,
        backgroundColor: "rgba(0,0,0, 0.1)",
        marginTop: 100
    },
    imgProductConStock:{
        width: 200,
        height: 200,
        alignSelf: "center",
        borderRadius: 40,
        marginHorizontal: 20,
        marginTop: 100
    },
    buttonConfirm: {
        backgroundColor: "#ff850d",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        marginHorizontal: 50,
        marginTop: 20
    },
    textConfirm:{
        color: 'white',
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
    goBack:{
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10
    },
    title:{
        marginHorizontal: 20,
        fontSize: 18,
        color: "#474747",
        marginTop: 10
    },
    description:{
        marginHorizontal: 20,
        fontSize: 18,
        color: "#474747",
        marginTop: 10
    },
    price:{
        marginHorizontal: 20,
        fontSize: 18,
        marginTop: 10
    },
    dondeEstoy:{
        fontSize: 20,
        color: "#464646"
    },
    categoriaAnterior:{
        fontSize: 20,
        textTransform : "capitalize"
    },
    descuento:{
        color: "#ff850d",
        fontSize: 18,
    },
    d:{
        fontSize: 18
    },
    viewDescuento:{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20
    },
    stock:{
        color: "red",
        marginHorizontal: 20,
        fontSize: 18,
        textAlign: "center",
        paddingTop: 25
    },
    viewComprarButton:{
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonIniciarCompra:{
        fontSize: 18,
        marginTop: 20
    },
    buttonIniciarSesionCompra:{
        fontSize: 20,
        textTransform: "uppercase",
        color: "red",
        marginTop: 20
    }
})