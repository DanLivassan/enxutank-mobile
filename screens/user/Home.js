import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, TouchableHighlight, Button } from 'react-native';
import * as fuelService from '../../services/fuel';
import { useAuth } from '../../context/auth.context';
import { useFuelContext } from '../../context/fuel.context';

import GoogleAutoComplete from '../components/GoogleAutoComplete';
import GasStationItem from '../components/GasStationItem';



const Home = ({ navigation }) => {
    const { setFuels, fuels } = useFuelContext();
    const [searching, setSearching] = useState(false);


    useEffect(() => {

    }, [])

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
            {searching ? (<View style={styles.searchField}>
                {<GoogleAutoComplete />}
            </View>) : null}
            {!searching ? <SafeAreaView style={styles.container}>

                <VirtualizedList
                    data={fuels}
                    initialNumToRender={4}
                    renderItem={({ item }) => (
                        <GasStationItem
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
});
export default Home
