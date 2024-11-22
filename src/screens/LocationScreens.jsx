import { Platform, Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import MapView, { Marker } from 'react-native-maps';

const LocationScreens = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [title, setTitle] = useState('')
    const [lugares, setLugares] = useState([])

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000
        })
    }


    const getPermision = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            return false
        }
        return true
    }

    const getLocation = async () => {
        const permisionOk = await getPermision()
        if (!permisionOk) {
            setErrorMsg('Permisos denegado')
        }
        else {
            let location = await Location.getCurrentPositionAsync({})
            if (location && title) {
                showToast("success", "ubicacion Obtenida")
            }
            else {
                setErrorMsg('error al obtener la ubicaion');
                showToast("error", "No se pudo obtener la ubicación")
            }
            setLocation(location.coords)
        }
    }

    const savePlace = () => {
        if (location && title) {
            setLugares(prevState => [...prevState, { "id": Math.random(), title, "coords": { "latitude": location.latitude, "longitude": location.longitude } }])
            setTitle("")
            setLocation("")
        } else {
            showToast("error", "Completa los datos")
        }
    }


    const renderLugares = ({ item }) => (
        <View style={styles.mapContainer} >
            <View>
                <Text style={styles.titlelugar}>Direccion: {item.title}</Text>
                <Text style={styles.latitude}>Latitud: {item.coords.latitude}</Text>
                <Text style={styles.longitude}>Longitud: {item.coords.longitude}</Text>
            </View>
            <View style={styles.viewMap}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
                    <Marker coordinate={{ "latitude": item.coords.latitude, "longitude": item.coords.longitude }} title="Shop-Pc" />
                </MapView>
            </View>
        </View >
    )

    return (
        <>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder='Ingresa Tu ubicacion' onChangeText={(text) => setTitle(text)} value={title} />
                <Pressable onPress={getLocation}><Icon name='pin-drop' size={50} /></Pressable>
                <Pressable onPress={savePlace}><Icon name='add-box' size={50} /></Pressable>
                <Toast />
            </View>
            <View style={styles.listaLugares}>
                <Text style={styles.title}> Tu Ubicacion</Text>
                <FlatList
                    data={lugares}
                    keyExtractor={item => item.id}
                    renderItem={renderLugares}
                />
            </View>

            <View>
                <Text style={styles.textUbicacion}>Nos encontramos en:</Text>
                <View style={styles.viewMapLocal}>
                <MapView
                    style={styles.mapLocal}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker coordinate={{  latitude: 37.78825, longitude: -122.4324, }} title="Shop-Pc" />
                </MapView>
                </View>
            </View>
        </>

    );
}

export default LocationScreens

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 50,
        paddingRight: 60,
        paddingLeft: 60,
        marginHorizontal: 10
    },
    title: {
        textAlign: "center",
        fontSize: 20
    },
    titlelugar: {
        fontSize: 20
    },
    container: {
        flexDirection: "row",
        padding: 20,
    },
    mapContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginTop: 30,
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20
    },
    viewMap: {
        borderRadius: 100,
        overflow: "hidden"
    },
    map: {
        width: 140,
        height: 140,
    },
    latitude: {
        fontSize: 16,
        marginTop: 10
    },
    longitude: {
        fontSize: 16,
    },
    textUbicacion:{
        fontSize: 18,
        textAlign: "center",
        marginTop: 100
    },

    mapLocal:{ 
        alignSelf: "center",
        width: 300,
        height: 200,
        marginTop: 30
    }
});