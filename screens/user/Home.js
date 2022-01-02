import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar } from 'react-native';
import * as fuelService from '../../services/fuel';
import fuelData from '../data/fuels';

const Item = ({ title, price, name }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
    </View>
);


const Home = () => {
    const [fuels, setFuels] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const fuel_prices = await fuelService.getAll()
            setFuels(fuel_prices)
        }
        fetchData();
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                data={fuels}
                initialNumToRender={4}
                renderItem={({ item }) => <Item title={item.gas_station} name={item.name} price={item.price} />}
                keyExtractor={item => item.id}
                getItemCount={(data) => data.length}
                getItem={(data, index) => {
                    return data[index]
                }}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    item: {
        backgroundColor: '#fff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 28,
    },
    name: {
        fontSize: 20,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold'
    },
});
export default Home
