import React, { useEffect, useRef } from 'react'
import { GOOGLE_MAPS_APIKEY } from '@env'
import MapViewDirections from 'react-native-maps-directions'
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { distanceBetween } from '../../utils/location.helper';
import { useFuelContext } from '../../context/fuel.context';
const { height, width } = Dimensions.get('window');
const MapDirection = (params) => {
    const { fuels, directionCoordinates, setDirectionCoordinates } = useFuelContext();
    console.log(fuels)
    const { origin, destination } = (params.route.params)
    const map = useRef()

    useEffect(() => {
        const distances = fuels.map(fuel => {
            for (const coords of directionCoordinates) {
                const distance = distanceBetween({ lat: coords.latitude, lng: coords.longitude }, { lat: parseFloat(fuel.latitude), lng: parseFloat(fuel.longitude) })

                if (distance < 1000) return { distance_of_route: distance, fuel }
            }
        })
        console.warn(distances.filter(Boolean))
    }, [directionCoordinates])
    return (
        <View style={styles.container}>
            <MapView ref={m => { map.current = m }} style={styles.map} >
                <MapViewDirections
                    origin={origin}
                    destination={destination}
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
