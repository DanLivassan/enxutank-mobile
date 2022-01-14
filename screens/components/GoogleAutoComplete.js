import React, { useEffect } from 'react'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView, View } from 'react-native';

const GoogleAutoComplete = () => {

    useEffect(() => {
        console.log("creating autocomplte")
    })

    return (
        <ScrollView>
            <GooglePlacesAutocomplete
                placeholder='Informe sua rota de hoje'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                listViewDisplayed={false}
                keyboardShouldPersistTaps='always'
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'pt-BR',
                }}
            />
        </ScrollView>
    )
}

export default GoogleAutoComplete
