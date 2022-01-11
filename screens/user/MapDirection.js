import React, { useRef } from 'react'
import { GOOGLE_MAPS_APIKEY } from '@env'
import MapViewDirections from 'react-native-maps-directions'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
const backgroundColor = '#007256';
const { height, width } = Dimensions.get('window');
const MapDirection = (params) => {
    const { origin, destination } = (params.route.params)
    const map = useRef()
    return (
        <View style={styles.container}>
            <MapView ref={m => { map.current = m }} style={styles.map} >
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                    onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)

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
