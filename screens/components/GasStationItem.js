import { View, Text, TouchableHighlight, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { distanceBetween } from '../../utils/location.helper';
import { goToDirection } from '../../services/directions.gmaps';
import Icon from 'react-native-vector-icons/FontAwesome5'
import millify from 'millify';
import moment from 'moment';
import 'moment/locale/pt-br'

const GasStationItem = ({ title, price, name, date, coords, userCoords }) => (
    <TouchableHighlight onPress={() => goToDirection(userCoords, coords)} >
        <View style={styles.item}>
            <View style={styles.iconView} >
                <Icon style={styles.icon} name="map-marker-alt" aria-description="Localização do posto"></Icon>
            </View>
            <View style={styles.dataView}>
                <Text style={styles.title}>{title.slice(0, 20)}</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>R$ {millify(price, { precision: 2, decimalSeparator: ',' })}</Text>
                <Text style={styles.date}>Atualizado {moment(date).locale('pt-BR').fromNow()}</Text>
                <Text>Distância: {isNaN(distanceBetween(coords, userCoords)) ? "Calculando..." : `${millify(distanceBetween(coords, userCoords))}m`}</Text>
            </View>
        </View>
    </TouchableHighlight >

);
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        margin: 2,
        flex: 1,
        height: 150,
        flexDirection: "row",
        padding: 20,
    },
    iconView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#aaaaaa",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        backgroundColor: "#dddddd"
    },
    dataView: {
        flex: 3,
        paddingLeft: 20,
        paddingRight: 20,
        alignContent: "center",
        alignItems: "center"
    },

    icon: {
        fontSize: 40,
        alignContent: "center",
        alignSelf: "center",
        color: "#de5246"
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
export default GasStationItem;
