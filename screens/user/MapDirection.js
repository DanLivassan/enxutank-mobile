import React, { useEffect, useRef, useState } from 'react'
import { GOOGLE_MAPS_APIKEY } from '@env'
import MapViewDirections from 'react-native-maps-directions'
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { distanceBetween } from '../../utils/location.helper';
import { useFuelContext } from '../../context/fuel.context';

const { height, width } = Dimensions.get('window');
const MapDirection = ({ origin, destination }) => {
    const { fuels, directionCoordinates, setDirectionCoordinates } = useFuelContext();
    const map = useRef()
    const [gas_station_marks, setGasStationMarks] = useState([])
    useEffect(() => {
        var n_gas_station_marks = fuels.map(fuel => {
            for (const coords of directionCoordinates) {
                const distance = distanceBetween({ lat: coords.latitude, lng: coords.longitude }, { lat: parseFloat(fuel.latitude), lng: parseFloat(fuel.longitude) })

                if (distance < 1000) return { distance_of_route: distance, fuel }
            }
        })
        n_gas_station_marks = n_gas_station_marks.filter(gas_station => gas_station)
        setGasStationMarks(n_gas_station_marks)
    }, [directionCoordinates])
    console.warn(gas_station_marks)
    const origin_parsed = { latitude: origin.coords.latitude, longitude: origin.coords.longitude }
    return (
        <View style={styles.container}>
            <MapView ref={m => { map.current = m }} style={styles.map} >
                {/* {gas_station_marks.map((marker, key) => <Marker key={key} coordinates={{ latitude: marker.fuel.latitude, longitude: marker.fuel.longitude }} />)} */}
                <MapViewDirections
                    origin={origin_parsed}
                    destination={{ latitude: destination.lat, longitude: destination.lng }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    language="pt-BR"
                    mode="DRIVING"
                    strokeColor="hotpink"
                    onReady={result => {
                        setDirectionCoordinates(result.coordinates)
                        map.current.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: (width / 20),
                                bottom: (height / 20),
                                left: (width / 20),
                                top: (height / 20),
                            }
                        });
                    }}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default MapDirection
