import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as fuelService from '../../services/fuel';
import millify from 'millify';
import moment from 'moment';
import { useAuth } from '../../context/auth.context';

const Item = ({ title, price, name, date }) => (
    <View style={styles.item}>
        <View style={styles.iconView}>
            <Icon style={styles.icon} name="map"></Icon>
        </View>
        <View style={styles.dataView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>R$ {millify(price, { precision: 2, decimalSeparator: ',' })}</Text>
            <Text style={styles.date}>Atualizado {moment(date).locale('pt-BR').fromNow()}</Text>
        </View>
    </View>
);


const Home = () => {
    const [fuels, setFuels] = useState([])
    const { location } = useAuth();
    console.log(location)
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
                renderItem={({ item }) => <Item title={item.gas_station} name={item.name} price={item.price} date={item.registered_date} />}
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
        fontSize: 28,
    },
    name: {
        fontSize: 20,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    date: {
        fontStyle: 'italic',
        color: "#bfbfbf"
    }
});
export default Home
