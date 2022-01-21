import { LogBox, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import GoogleAutoComplete from '../components/GoogleAutoComplete';
import { useFuelContext } from '../../context/fuel.context';
import MapDirection from './MapDirection';
import { useAuth } from '../../context/auth.context';

const GetDirections = () => {
    const { location, destination } = useAuth()
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    return (

        <ScrollView style={styles.searchField}>
            <GoogleAutoComplete />
            {destination && location && <MapDirection origin={location} destination={destination} />}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    searchField: {
        padding: 10
    }
})
export default GetDirections;
