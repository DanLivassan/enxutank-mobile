import React, { useEffect } from 'react'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from 'react-native';
import { useAuth } from '../../context/auth.context';

const GoogleAutoComplete = () => {
    const { setDestination } = useAuth()
    useEffect(() => {
    })

    return (
        <ScrollView keyboardShouldPersistTaps={"always"}>
            <GooglePlacesAutocomplete
                placeholder='Informe sua rota de hoje'
                keepResultsAfterBlur={true}
                onPress={(data, details) => {
                    const { lat, lng } = details.geometry.location;
                    setDestination({ lat, lng })
                }}
                // listViewDisplayed={true}
                fetchDetails={true}
                keyboardShouldPersistTaps={"always"}
                // currentLocation={"Brazil"}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'pt-BR',
                    location: 'Brazil'
                }}
            />
        </ScrollView>
    )
}

export default GoogleAutoComplete
