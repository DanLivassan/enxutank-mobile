import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, TouchableHighlight, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as fuelService from '../../services/fuel';
import millify from 'millify';
import moment from 'moment';
import { useAuth } from '../../context/auth.context';
import { distanceBetween } from '../../utils/location.helper';
import { useFuelContext } from '../../context/fuel.context';
import { goToDirection } from '../../services/directions.gmaps';
import GoogleAutoComplete from '../components/GoogleAutoComplete';



const Home = ({ navigation }) => {
    const { setFuels, fuels } = useFuelContext();
    const [searching, setSearching] = useState(false);
    // const goToDirection = (origin, destination, userCoords) => {
    //     navigation.push(MapDirection.name,
    //         {
    //             origin: { latitude: origin.lat, longitude: origin.lng },
    //             destination: { latitude: destination.lat, longitude: destination.lng },
    //             userCoords: userCoords
    //         })
    // }


    useEffect(() => {

    }, [])

    const Item = ({ title, price, name, date, coords, userCoords }) => (
        <TouchableHighlight onPress={() => goToDirection(userCoords, coords)} >
            <View style={styles.item}>
                <View style={styles.iconView} >
                    <Icon style={styles.icon} name="map"></Icon>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>R$ {millify(price, { precision: 2, decimalSeparator: ',' })}</Text>
                    <Text style={styles.date}>Atualizado {moment(date).locale('pt-BR').fromNow()}</Text>
                    <Text>Distância: {isNaN(distanceBetween(coords, userCoords)) ? "Calculando..." : millify(distanceBetween(coords, userCoords))}m</Text>
                </View>
            </View>
        </TouchableHighlight >

    );
    //const [fuels, setFuels] = useState([])
    const { location } = useAuth();
    const userCoords = { lat: location.coords?.latitude, lng: location.coords?.longitude }

    useEffect(() => {
        const fetchData = async () => {
            const fuel_prices = await fuelService.getAll()
            setFuels(fuel_prices)
        }
        fetchData();
    }, [])


    return (
        <>
            <Button
                title={!searching ? 'Pesquisar' : "Ver postos"}
                onPress={() => { setSearching(!searching) }}
            />


            {searching ? (<View style={styles.searchField}>
                {<GoogleAutoComplete />}
            </View>) : null}
            {!searching ? <SafeAreaView style={styles.container}>

                <VirtualizedList
                    data={fuels}
                    initialNumToRender={4}
                    renderItem={({ item }) => (
                        <Item
                            title={item.gas_station}
                            name={item.name}
                            price={item.price}
                            date={item.registered_date}
                            coords={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }}
                            userCoords={userCoords}
                        />)}
                    keyExtractor={item => item.id}
                    getItemCount={(data) => data.length}
                    getItem={(data, index) => {
                        return data[index]
                    }}
                />
            </SafeAreaView> : null}
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    iconView: {
        paddingLeft: 20,
        paddingRight: 20,
        alignContent: "center",
        textAlignVertical: "center"
    },

    icon: {
        width: 20,
        fontSize: 40,
        marginRight: 40,
        alignContent: "center",
        color: "red"
    },
    item: {
        backgroundColor: '#fff',
        margin: 2,
        flex: 1,
        height: 150,
        flexDirection: "row",
        padding: 20,
    },
    title: {
        fontSize: 18,
    },
    name: {
        fontSize: 14,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    date: {
        fontStyle: 'italic',
        color: "#bfbfbf"
    },
    searchField: {
        padding: 10,

    }
});
export default Home
