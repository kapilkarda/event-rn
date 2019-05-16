import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Dimensions,
    View,
    TouchableOpacity,
    BackHandler,
    Image,
    AsyncStorage,
    SafeAreaView

} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


class SearchPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            lat: '',
            lng: '',
            selectedCity: '',
            selectedState: '',
            selectedCountry: '',
            searcharray: '',
            data:props.data
        };

      console.log(props)
    }


    render() {
        return (
            <SafeAreaView style={styles.container}  >
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} 
                    autoFocus={true}
                    returnKeyType={'search'} 
                    listViewDisplayed='auto'    
                    fetchDetails={true}
                    renderDescription={row => row.description} 
                    onPress={(data, details = null) => {
                        console.log(data);
                        console.log(details);
                        var data = details.formatted_address.split(',')
                        console.log(data);

                        let savelocationInfo = {
                            cityname: details.name,
                            country: data[2],
                            state: data[1],
                            lat: details.geometry.location.lat.toString(),
                            lng: details.geometry.location.lng.toString(),

                        }
                        //AsyncStorage.setItem("locationInfo", JSON.stringify(savelocationInfo));
                        console.log(savelocationInfo);
                        if(this.state.data ==="AddEvent")
                          Actions.AddEvent(savelocationInfo)
                          else{
                            Actions.Home(savelocationInfo)
                          }
                        //this.props.navigation.goBack(savelocationInfo)
                   


                    }}

                    getDefaultValue={() => ''}
                    query={{
                        key: 'AIzaSyC9UHGV52harL78t-VmvXb_p-hQj4K-OQA',
                        language: 'en',
                    }}

                    styles={{
                        textInputContainer: {
                            width: '100%'
                        },
                        description: {
                            fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        }
                    }}


                    nearbyPlacesAPI='GooglePlacesSearch'
                    GoogleReverseGeocodingQuery={{

                    }}
                    GooglePlacesSearchQuery={{

                        rankby: 'distance',
                        types: 'food'
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}


                    debounce={200}
                    renderRightButton={() => (
                        <TouchableOpacity style={{ padding: 10 }}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <View style={{}}>
                                <Text style={{ fontSize: 15 }}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Autocomplete: {
        margin: 5
    }

});
export default SearchPlaces;