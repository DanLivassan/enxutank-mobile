import getDirections from 'react-native-google-maps-directions'

export const goToDirection = (origin, destination) => {
    const data = {
        source: {
            latitude: origin.lat,
            longitude: origin.lng
        },
        destination: {
            latitude: destination.lat,
            longitude: destination.lng
        },
        params: [
            {
                key: "travelmode",
                value: "driving"        // may be "walking", "bicycling" or "transit" as well
            },
            {
                key: "dir_action",
                value: "navigate"       // this instantly initializes navigation using the given travel mode
            }
        ],

    }
    getDirections(data)
}