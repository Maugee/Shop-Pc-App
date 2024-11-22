import { StyleSheet, Text, View, FlatList, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Search from '../components/Search'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../services/shopService'
import { useDispatch } from 'react-redux'
import { setProductId } from '../features/ShopSlice'

import FiltradoProducts from '../components/FiltradoProducts'


const ProductsScreens = ({ route, navigation }) => {

    const [productFiltered, setProductFiltered] = useState([])
    const [search, setSearch] = useState("")

    const category = useSelector(state => state.shopSlice.value.categorySelected)

    const { data: productFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category)

    const dispatch = useDispatch()

    useEffect(() => {
        setProductFiltered(productFilteredByCategory)
        if (search) {
            setProductFiltered(productFiltered.filter(product => product.title.toLowerCase().includes(search.toLowerCase())))
        }
    }, [search, productFilteredByCategory])

    const renderPorductsItem = ({ item }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setProductId(item.id))
                navigation.navigate("Producto")
            }}>
                <View style={styles.itemView}>
                    <Image source={{ uri: item.mainImage }} resizeMode='contain' style={styles.imgProducts} />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                    {
                        item.discount > 0 && <View style={styles.viewDescuento}><Text style={styles.d}>Descuento:</Text><Text style={styles.descuento}>{item.discount}%</Text></View>
                    }
                    {
                        item.stock <= 0 && <View><Text style={styles.stock}>Sin Stock</Text></View>
                    }
                </View>
            </Pressable>
        )
    }

    return (
        <View>
            <View style={styles.fondoComponents}>
                {
                    isLoading
                        ?
                        <ActivityIndicator size="large" color="blue" />
                        :
                        error
                            ?
                            <Text>Error al cargar las categorias</Text>
                            :
                            <>
                                <View style={styles.goBack}>
                                    <Pressable onPress={() => navigation.goBack()}><Icon name="home" size={30} color="#ff850d" /></Pressable>
                                    <Text style={styles.dondeEstoy}> / {category}</Text>
                                </View>
                                <Search setSearch={setSearch} />
                                <FiltradoProducts productFilteredByCategory={productFilteredByCategory} productFiltered={productFiltered} setProductFiltered={setProductFiltered} setSearch={setSearch}/>
                                {
                                    productFiltered && productFiltered.length === 0
                                        ?
                                        <View>
                                            <Text style={styles.productNotFound}>no se encontraron los productos ....</Text>
                                            <Text style={styles.productNotFound1}>Ingrese bien el nombre</Text>
                                        </View>
                                        :
                                        <>
                                        <FlatList
                                            data={productFiltered}
                                            keyExtractor={item => item.id}
                                            renderItem={renderPorductsItem}
                                        />
                                        </>
                                }
                            </>
                }
            </View>
        </View>
    )
}



export default ProductsScreens

const styles = StyleSheet.create({
    imgProducts: {
        width: 150,
        height: 120,
        marginTop: 10
    },
    itemView: {
        marginVertical: 20,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#dbdbdb",
        marginHorizontal: 20
    },
    title: {
        fontSize: 18,
        paddingTop: 10,
    },
    price: {
        fontSize: 18
    },
    descuento: {
        fontSize: 16,
        color: "#ff850d"
    },
    d: {
        fontSize: 18
    },
    viewDescuento: {
        flexDirection: "row",
        fontSize: 16,
        alignItems: "center",
        marginBottom: 20
    },
    stock: {
        color: "red",
        fontSize: 16
    },
    fondoComponents: {
        backgroundColor: "white",
        height: "100%"
    },
    goBack: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10
    },
    dondeEstoy: {
        fontSize: 20,
        color: "#464646"
    },
    productNotFound: {
        textAlign: "center",
        fontSize: 18,
        marginTop: 50,
        textTransform: "uppercase"
    },
    productNotFound1: {
        textAlign: "center",
        fontSize: 18,
        textTransform: "uppercase"
    }
})