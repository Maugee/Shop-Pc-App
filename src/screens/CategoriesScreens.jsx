import { StyleSheet, Text, View, FlatList, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { FlatGrid } from 'react-native-super-grid'
// import categories from "../data/categories.json"
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../features/ShopSlice'
import { useGetCategoriesQuery } from '../services/shopService'


const CategoriesScreens = ({ navigation }) => {

    // const categories = useSelector(state=>state.shopSlice.value.categories)

    const { data: categories, error, isLoading } = useGetCategoriesQuery()

    if (error) {
        console.log('Error:', error);  // Agrega este log
        return <Text>Error al cargar las categorias</Text>;
    }

    const dispatch = useDispatch()

    const renderCategoriesItem = ({ item }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setCategory(item.title))
                navigation.navigate("Productos")
            }}>
                <View style={styles.verCategories}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image source={{ uri: item.image }} resizeMode='contain' style={styles.imgCategories} />
                </View>
            </Pressable>
        )
    }

    return (
        <>
        <View style={styles.fondoComponentes}>
            {
                isLoading
                    ?
                    <ActivityIndicator size="large" color="blue" />
                    :
                    error
                        ?
                        <Text>Error al cargar las categorias</Text>
                        :
                        <FlatGrid
                            itemDimension={130}
                            data={categories}
                            keyExtractor={item => item.id}
                            renderItem={renderCategoriesItem}
                        />
            }
            </View>
        </>
    )
}

export default CategoriesScreens

const styles = StyleSheet.create({
    imgCategories: {
        width: 150,
        height: 120,
        marginBottom: 20
    },
    verCategories: {
        marginVertical: 20,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#dbdbdb"
    },
    title:{
        fontSize: 20,
        textTransform: "uppercase",
        paddingTop: 20,
    },
    fondoComponentes:{
        backgroundColor: "white",
        height: "100%"
    }
})